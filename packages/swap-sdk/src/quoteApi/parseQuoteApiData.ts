import { Fraction } from "bi-fraction";

import { LP_FEE_RATIOS } from "../config/poolTypes";
import type {
  BestAMMTradeOpts,
  Slippage,
  SupportedChainId,
  TokenAmount,
  Trade,
  TradeRoute,
} from "../types";
import { mapRoutePath } from "../utils/mapReduceRoutePath";
import { parsePool } from "./parsePoolData";
import { parseAmount, tokenAmount } from "./parseTokenAmount";
import type { TradeQuoteData } from "./types";

export function parseQuoteApiData(
  chainId: SupportedChainId,
  quoteData: TradeQuoteData,
  isInputNativeToken: boolean,
  isOutputNativeToken: boolean,
  opts: BestAMMTradeOpts,
): Trade {
  const tolerance = new Fraction(opts.slippageTolerance);

  const amountIn = parseAmount(
    quoteData.amountIn,
    isInputNativeToken ? chainId : undefined,
  );
  const amountOut = parseAmount(
    quoteData.amountOut,
    isOutputNativeToken ? chainId : undefined,
  );

  const routes = quoteData.routes.map((route) => parseRoute(route, opts));

  const price = new Fraction(amountOut.amount).sub(amountIn.amount);

  const lpFeeRatio = routes.reduce((sum, r) => {
    const remain = r.pool.reduce(
      (acc, p) => acc.mul(new Fraction(1).sub(LP_FEE_RATIOS[p.version])),
      new Fraction(1),
    );
    return sum.add(new Fraction(1).sub(remain).mul(r.percentage));
  }, new Fraction(0));
  const lpFee = tokenAmount(lpFeeRatio.mul(amountIn.amount), amountIn);

  return {
    type: opts.tradeType,

    amountIn,
    amountOut,
    routes,

    price,

    lpFeeRatio,
    lpFee,

    slippage: calcSlippage(amountIn, amountOut, tolerance, opts),
  };
}

function parseRoute(
  route: TradeQuoteData["routes"][0],
  opts: BestAMMTradeOpts,
): TradeRoute {
  const slippageTolerance = new Fraction(opts.slippageTolerance);
  const amountIn = parseAmount(route.amountIn);
  const amountOut = parseAmount(route.amountOut);
  const pool = route.pool.map((p) => parsePool(p));

  return {
    amountIn,
    amountOut,
    percentage: new Fraction(route.percentage).shr(2),

    pool,

    path: [
      {
        address: amountIn.address,
        symbol: amountIn.symbol,
        decimals: amountIn.decimals,
      },
      ...mapRoutePath({ amountIn, pool }, ({ tokenTo }) => tokenTo),
    ],
    slippage: calcSlippage(amountIn, amountOut, slippageTolerance, opts),
  };
}

function calcSlippage(
  amountIn: TokenAmount,
  amountOut: TokenAmount,
  tolerance: Fraction,
  opts: BestAMMTradeOpts,
): Slippage {
  return opts.tradeType === "EXACT_INPUT"
    ? {
        minimumReceived: tokenAmount(
          new Fraction(1).add(tolerance).invert().mul(amountOut.amount),
          amountOut,
        ),
        type: "minimumReceived",
        tolerance,
      }
    : {
        maximumSold: tokenAmount(
          new Fraction(1).add(tolerance).mul(amountIn.amount),
          amountIn,
        ),
        type: "maximumSold",
        tolerance,
      };
}
