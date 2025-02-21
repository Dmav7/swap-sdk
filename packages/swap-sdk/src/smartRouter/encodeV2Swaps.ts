import { Fraction } from "bi-fraction";
import { getAddress } from "ethers";

import { PoolType, TradeType } from "../types";
import { mapRoutePath, routePath } from "../utils/mapReduceRoutePath";
import { tokenAmountToWei } from "../utils/tokenAmountToWei";
import { ADDRESS_THIS, MSG_SENDER } from "./consts";
import { encodeSmartRouterFunctionData } from "./contractInterfaces";
import type { EncodableTradeRoute, EncodeArgs } from "./types";

export function encodeV2Swaps(
  route: EncodableTradeRoute,
  tradeType: TradeType,
  outputCustodyDuringTx: boolean,
  encodeArgs: EncodeArgs,
): string {
  if (mapRoutePath(route, (_, p) => p.version).some((v) => v !== PoolType.V2)) {
    throw new Error("encodeV2Swap: route includes pools beside PoolType.V2");
  }
  const path = routePath(route);

  const recipient = outputCustodyDuringTx
    ? ADDRESS_THIS
    : typeof encodeArgs.recipient === "undefined"
      ? MSG_SENDER
      : getAddress(encodeArgs.recipient);

  if (tradeType === TradeType.EXACT_INPUT) {
    const minimumReceived =
      route.slippage?.type === "minimumReceived"
        ? tokenAmountToWei(route.slippage.minimumReceived)
        : 0n;

    if (route.amountIn.amount.lte(Fraction.ZERO)) {
      throw new Error(
        "encodeV2Swaps: does not support 0 amountIn with EXACT_INPUT",
      );
    }

    return encodeSmartRouterFunctionData("swapExactTokensForTokens", [
      tokenAmountToWei(route.amountIn),
      minimumReceived,
      path,
      recipient,
    ]);
  } else if (tradeType === TradeType.EXACT_OUTPUT) {
    const maximumSold =
      route.slippage?.type === "maximumSold"
        ? tokenAmountToWei(route.slippage.maximumSold)
        : 0n;

    if (route.amountOut.amount.lte(Fraction.ZERO)) {
      throw new Error(
        "encodeV2Swaps: does not support 0 amountOut with EXACT_OUTPUT",
      );
    }

    return encodeSmartRouterFunctionData("swapTokensForExactTokens", [
      tokenAmountToWei(route.amountOut),
      maximumSold,
      path,
      recipient,
    ]);
  }

  throw new Error("encodeV2Swap: unexpected tradeType");
}
