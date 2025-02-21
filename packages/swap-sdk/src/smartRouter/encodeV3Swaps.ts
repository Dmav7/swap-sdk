import { getAddress, solidityPacked } from "ethers";

import type { V3PoolTypes } from "../types";
import { PoolType, TradeType } from "../types";
import { reduceRoutePath } from "../utils/mapReduceRoutePath";
import { tokenAmountToWei } from "../utils/tokenAmountToWei";
import { ADDRESS_THIS, MSG_SENDER } from "./consts";
import { encodeSmartRouterFunctionData } from "./contractInterfaces";
import type { EncodableTradeRoute, EncodeArgs } from "./types";

const V3_VERSION_TO_FEE: Record<V3PoolTypes, number> = {
  [PoolType.V3_100]: 100,
  [PoolType.V3_500]: 500,
  [PoolType.V3_3000]: 3000,
  [PoolType.V3_10000]: 10000,
};

export function encodeV3Swaps(
  route: EncodableTradeRoute,
  tradeType: TradeType,
  outputCustodyDuringTx: boolean,
  encodeArgs: EncodeArgs,
): string {
  const recipient = outputCustodyDuringTx
    ? ADDRESS_THIS
    : typeof encodeArgs.recipient === "undefined"
      ? MSG_SENDER
      : getAddress(encodeArgs.recipient);

  if (tradeType === TradeType.EXACT_INPUT) {
    const amountOutMinimum =
      route.slippage?.type === "minimumReceived"
        ? tokenAmountToWei(route.slippage.minimumReceived)
        : 0n;
    return encodeSmartRouterFunctionData("exactInput", [
      {
        path: packV3SwapPathData(route, tradeType),
        recipient,
        amountIn: tokenAmountToWei(route.amountIn),
        amountOutMinimum,
      },
    ]);
  } else if (tradeType === TradeType.EXACT_OUTPUT) {
    const amountInMaximum =
      route.slippage?.type === "maximumSold"
        ? tokenAmountToWei(route.slippage.maximumSold)
        : 0n;
    return encodeSmartRouterFunctionData("exactOutput", [
      {
        path: packV3SwapPathData(route, tradeType),
        recipient,
        amountOut: tokenAmountToWei(route.amountOut),
        amountInMaximum,
      },
    ]);
  }

  throw new Error("encodeV3Swaps: unexpected tradeType");
}

export function encodeSingleHopV3Swap(
  route: EncodableTradeRoute,
  tradeType: TradeType,
  outputCustodyDuringTx: boolean,
  encodeArgs: EncodeArgs,
) {
  if (route.pool.length !== 1) {
    throw new Error("encodeSingleHopV3Swap: route is multi-hop");
  }
  const pool = route.pool[0];
  if (pool?.version === "V2" || !pool?.version.startsWith("V3_")) {
    throw new Error("encodeSingleHopV3Swap: not v3 PoolType");
  }

  const recipient = outputCustodyDuringTx
    ? ADDRESS_THIS
    : typeof encodeArgs.recipient === "undefined"
      ? MSG_SENDER
      : getAddress(encodeArgs.recipient);

  if (tradeType === TradeType.EXACT_INPUT) {
    const amountOutMinimum =
      route.slippage?.type === "minimumReceived"
        ? tokenAmountToWei(route.slippage.minimumReceived)
        : 0n;
    return encodeSmartRouterFunctionData("exactInputSingle", [
      {
        tokenIn: route.amountIn.address,
        tokenOut: route.amountOut.address,
        fee: V3_VERSION_TO_FEE[pool.version],
        recipient,
        amountIn: tokenAmountToWei(route.amountIn),
        amountOutMinimum,
        sqrtPriceLimitX96: 0,
      },
    ]);
  } else if (tradeType === TradeType.EXACT_OUTPUT) {
    const amountInMaximum =
      route.slippage?.type === "maximumSold"
        ? tokenAmountToWei(route.slippage.maximumSold)
        : 0n;
    return encodeSmartRouterFunctionData("exactOutputSingle", [
      {
        tokenIn: route.amountIn.address,
        tokenOut: route.amountOut.address,
        fee: V3_VERSION_TO_FEE[pool.version],
        recipient,
        amountOut: tokenAmountToWei(route.amountOut),
        amountInMaximum,
        sqrtPriceLimitX96: 0,
      },
    ]);
  }

  throw new Error("encodeSingleHopV3Swap: unexpected tradeType");
}

function packV3SwapPathData(route: EncodableTradeRoute, tradeType: TradeType) {
  const { types, values } = reduceRoutePath<{
    values: (string | number)[];
    types: string[];
  }>(
    route,
    ({ values, types }, step, pool) => {
      if (pool.version === "V2" || !pool.version.startsWith("V3_")) {
        throw new Error("packV3SwapPathData: not v3 PoolType");
      }
      return {
        values: [
          ...values,
          V3_VERSION_TO_FEE[pool.version],
          step.tokenTo.address,
        ],
        types: [...types, "uint24", "address"],
      };
    },
    { values: [route.amountIn.address], types: ["address"] },
  );

  if (tradeType === TradeType.EXACT_OUTPUT) {
    return solidityPacked(types.reverse(), values.reverse());
  }
  return solidityPacked(types, values);
}
