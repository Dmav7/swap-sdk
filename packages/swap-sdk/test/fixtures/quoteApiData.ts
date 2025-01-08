import { PoolType } from "../../src";
import type {
  TradeQuoteData,
  TradeQuoteV2PoolData,
  TradeQuoteV3PoolData,
} from "../../src/quoteApi/types";

export const mockTokenA = {
  address: "0x1000000000000000000000000000000000000000",
  symbol: "TOKA",
  decimals: 18,
};
export const mockTokenB = {
  address: "0x3000000000000000000000000000000000000000",
  symbol: "TOKB",
  decimals: 18,
};
export const mockTokenC = {
  address: "0x2000000000000000000000000000000000000000",
  symbol: "TOKC",
  decimals: 6,
};

const exampleV2Pool: TradeQuoteV2PoolData = {
  token0: mockTokenA,
  token1: mockTokenC,
  address: "0xpool100000000000000000000000000000000000",
  version: PoolType.V2 as const,
  reserve0: {
    token: mockTokenA,
    rawAmount: "1000000000000000000",
    amount: "1",
  },
  reserve1: {
    token: mockTokenC,
    rawAmount: "2000000",
    amount: "2",
  },
};

const exampleV3Pool: TradeQuoteV3PoolData = {
  version: PoolType.V3_3000 as const,
  token0: mockTokenA,
  token1: mockTokenC,
  address: "0xpool200000000000000000000000000000000000",
  fee: PoolType.V3_3000,
  tick: "0",
  liquidity: "100000000000000000004",
  sqrtRatioX96: "79228162514264337593543950336", // 1:1 ratio
  token0ProtocolFee: 0,
  token1ProtocolFee: 0,
};

export const exampleQuoteDataA: TradeQuoteData = {
  amountIn: {
    token: mockTokenA,
    amount: "1",
    rawAmount: "1000000000000000000",
  },
  amountOut: {
    token: mockTokenC,
    amount: "1.9",
    rawAmount: "1900000",
  },
  routes: [
    {
      amountIn: {
        token: mockTokenA,
        amount: "1",
        rawAmount: "1000000000000000000",
      },
      amountOut: {
        token: mockTokenC,
        amount: "1.9",
        rawAmount: "1900000",
      },
      gasEstimate: "100000",
      percentage: 100, // 100%
      pool: [exampleV2Pool],
    },
  ],
  gasEstimate: "0",
};

export const exampleQuoteDataB: TradeQuoteData = {
  amountIn: {
    token: mockTokenA,
    amount: "1",
    rawAmount: "1000000000000000000",
  },
  amountOut: {
    token: mockTokenC,
    amount: "2",
    rawAmount: "2000000",
  },
  routes: [
    {
      amountIn: {
        token: mockTokenA,
        amount: "0.5",
        rawAmount: "500000000000000000",
      },
      amountOut: {
        token: mockTokenC,
        amount: "1",
        rawAmount: "1000000",
      },
      gasEstimate: "0",
      percentage: 50,
      pool: [exampleV2Pool],
    },
    {
      amountIn: {
        token: mockTokenA,
        amount: "500000000000000000",
        rawAmount: "5",
      },
      amountOut: {
        token: mockTokenC,
        amount: "1000000",
        rawAmount: "1000000",
      },
      gasEstimate: "150000",
      percentage: 50,
      pool: [exampleV3Pool],
    },
  ],
  gasEstimate: "0",
};

export const exampleV2PoolA: TradeQuoteV2PoolData = {
  token0: mockTokenA,
  token1: mockTokenC,
  address: "0xpool300000000000000000000000000000000000",
  version: PoolType.V2 as const,
  reserve0: {
    token: mockTokenA,
    rawAmount: "1000000000000000000",
    amount: "1",
  },
  reserve1: {
    token: mockTokenC,
    rawAmount: "2000000",
    amount: "2",
  },
};

export const exampleV3PoolA: TradeQuoteV3PoolData = {
  version: PoolType.V3_3000,
  token0: mockTokenA,
  token1: mockTokenB,
  address: "0xpool400000000000000000000000000000000000",
  fee: PoolType.V3_3000,
  tick: "99059",
  liquidity: "1317444747259733306491692785",
  sqrtRatioX96: "11215723793643411978199961655566",
  token0ProtocolFee: 0,
  token1ProtocolFee: 0,
};

export const exampleV3PoolB: TradeQuoteV3PoolData = {
  version: PoolType.V3_3000,
  token0: mockTokenC,
  token1: mockTokenA,
  address: "0xpool500000000000000000000000000000000000",
  fee: PoolType.V3_3000,
  tick: "291521",
  liquidity: "1305834139233645876",
  sqrtRatioX96: "169384392706952765172101240651672901",
  token0ProtocolFee: 0,
  token1ProtocolFee: 0,
};
