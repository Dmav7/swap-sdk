import type { Fraction } from "bi-fraction";

import type { TradeRoute } from "../types";

export interface EncodeArgs {
  /**
   * SmartRouter.unwrapWETH9 requires recipient and it CAN NOT be MSG_SENDER (0x0000000000000000000000000000000000000001)
   */
  recipient: string;
  deadlineOrPreviousBlockhash?: string | bigint;
  fee?: TradeFeeOptions;
}

export interface TradeFeeOptions {
  fee: Fraction;
  recipient: string;
}

export type EncodableTradeRoute = Pick<
  TradeRoute,
  "amountIn" | "amountOut" | "pool"
> &
  Partial<Pick<TradeRoute, "slippage">>;
