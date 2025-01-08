import type { NativeOrTokenAmount, TokenAmount, Trade } from "../types";
import { TradeType } from "../types";
import { tokenAmountToWei } from "../utils/tokenAmountToWei";
import { encodeSmartRouterFunctionData } from "./contractInterfaces";
import type { EncodeTradeOptions, TradeFeeOptions } from "./types";

export function encodeUnwrapWETH9(trade: Trade, options: EncodeTradeOptions) {
  const minimumAmountWei = tokenAmountToWei(unwrapOrSweepAmount(trade));

  if (options.fee) {
    return encodeSmartRouterFunctionData(
      "unwrapWETH9WithFee(uint256,address,uint256,address)",
      [
        minimumAmountWei,
        options.recipient,
        encodeFeeBips(options.fee),
        options.fee.recipient,
      ],
    );
  }

  return encodeSmartRouterFunctionData("unwrapWETH9", [
    minimumAmountWei,
    options.recipient,
  ]);
}

export function encodeSweepToken(trade: Trade, options: EncodeTradeOptions) {
  const minimumAmount = unwrapOrSweepAmount(trade);
  const minimumAmountWei = tokenAmountToWei(minimumAmount);
  const recipient = options.recipient;

  if (options.fee) {
    if (recipient) {
      return encodeSmartRouterFunctionData(
        "sweepTokenWithFee(address,uint256,address,uint256,address)",
        [
          minimumAmount.address,
          minimumAmountWei,
          recipient,
          encodeFeeBips(options.fee),
          options.fee.recipient,
        ],
      );
    }

    return encodeSmartRouterFunctionData(
      "sweepTokenWithFee(address,uint256,uint256,address)",
      [
        minimumAmount.address,
        minimumAmountWei,
        encodeFeeBips(options.fee),
        options.fee.recipient,
      ],
    );
  }

  if (recipient) {
    return encodeSmartRouterFunctionData(
      "sweepToken(address,uint256,address)",
      [minimumAmount.address, minimumAmountWei, recipient],
    );
  }

  return encodeSmartRouterFunctionData("sweepToken(address,uint256)", [
    minimumAmount.address,
    minimumAmountWei,
  ]);
}

export function encodeRefundETH() {
  return encodeSmartRouterFunctionData("refundETH");
}

function unwrapOrSweepAmount(trade: Trade): NativeOrTokenAmount | TokenAmount {
  if (
    trade.type === TradeType.EXACT_OUTPUT &&
    trade.slippage.type === "maximumSold"
  ) {
    return trade.amountOut;
  }
  if (
    trade.type === TradeType.EXACT_INPUT &&
    trade.slippage.type === "minimumReceived"
  ) {
    return trade.slippage.minimumReceived;
  }

  throw new Error("unwrapSweepAmount: unexpected trade type");
}

function encodeFeeBips(feeOptions: TradeFeeOptions) {
  return BigInt(feeOptions.fee.mul(10000n).toFixed(0));
}
