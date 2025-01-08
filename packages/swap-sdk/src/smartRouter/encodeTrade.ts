import type { Trade } from "../types";
import { TradeType } from "../types";
import { tokenAmountToWei } from "../utils/tokenAmountToWei";
import { encodeMulticall } from "./encodeMulticall";
import { encodeSwaps } from "./encodeSwaps";
import {
  encodeRefundETH,
  encodeSweepToken,
  encodeUnwrapWETH9,
} from "./encodeUnwrapSweep";
import type { EncodeTradeOptions } from "./types";

export function encodeTrade(
  trade: Trade,
  options: EncodeTradeOptions,
): {
  value: bigint;
  calldata: string;
} {
  const isInputNative = trade.amountIn.address === "NATIVE";
  const isOutputNative = trade.amountOut.address === "NATIVE";

  const outputCustodyDuringTx = isOutputNative || !!options.fee;

  const swapCalldatas = trade.routes.flatMap((route) =>
    encodeSwaps(route, trade.type, outputCustodyDuringTx, options),
  );

  const value = isInputNative ? nativeTokenInputAmount(trade) : 0n;
  const calldata = encodeMulticall(
    [
      ...swapCalldatas,
      ...(outputCustodyDuringTx
        ? [
            isOutputNative
              ? encodeUnwrapWETH9(trade, options)
              : encodeSweepToken(trade, options),
          ]
        : []),
      ...(isInputNative && trade.type === TradeType.EXACT_OUTPUT
        ? [encodeRefundETH()]
        : []),
    ],
    options.deadlineOrPreviousBlockhash,
  );

  return {
    value,
    calldata,
  };
}

function nativeTokenInputAmount(trade: Trade): bigint {
  if (trade.type === TradeType.EXACT_INPUT) {
    return tokenAmountToWei(trade.amountIn);
  }
  if (
    trade.type === TradeType.EXACT_OUTPUT &&
    trade.slippage.type === "maximumSold"
  ) {
    return tokenAmountToWei(trade.slippage.maximumSold);
  }

  throw new Error("nativeTokenInputAmount: unexpected trade.type");
}
