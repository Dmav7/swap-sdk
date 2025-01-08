import { Fraction } from "bi-fraction";

import type { V2Pool, V3Pool } from "../types";
import { parseAmount } from "./parseTokenAmount";
import type { TradeQuotePoolData } from "./types";

const Q96 = 2n ** 96n;
const Q192 = Q96 ** 2n;

export function parsePool(poolData: TradeQuotePoolData) {
  const { token0, token1, address, version } = poolData;

  if (version === "V2") {
    const reserve0 = parseAmount(poolData.reserve0);
    const reserve1 = parseAmount(poolData.reserve1);

    const v2Pool: V2Pool = {
      token0,
      token1,
      address,
      version,
      token0Price: reserve1.amount.div(reserve0.amount),
      token1Price: reserve0.amount.div(reserve1.amount),

      reserve0,
      reserve1,
    };
    return v2Pool;
  } else if (version.startsWith("V3_")) {
    const sqrtRatioX96 = BigInt(poolData.sqrtRatioX96);
    const ratioX96BN = sqrtRatioX96 ** 2n;

    const v3Pool: V3Pool = {
      token0,
      token1,
      address,
      version,
      token0Price: new Fraction(ratioX96BN, Q192)
        .shr(token1.decimals)
        .shl(token0.decimals),
      token1Price: new Fraction(Q192, ratioX96BN)
        .shr(token0.decimals)
        .shl(token1.decimals),

      liquidity: BigInt(poolData.liquidity),
      sqrtRatioX96,
      tick: parseInt(poolData.tick),
    };

    return v3Pool;
  } else {
    throw new InvalidPoolError();
  }
}

export class InvalidPoolError extends Error {
  constructor() {
    super("parsePool: invalid pool");
  }
}
