import type { V3Pool } from "../../src";
import { InvalidPoolError, parsePool } from "../../src/quoteApi/parsePoolData";
import {
  exampleV2PoolA,
  exampleV3PoolA,
  exampleV3PoolB,
} from "../fixtures/quoteApiData";

describe("parsePool", () => {
  describe("V2 pools", () => {
    it("calculates token0 price correctly", () => {
      const pool = parsePool(exampleV2PoolA);
      expect(pool.token0Price.toFixed(6)).toBe("2.000000");
    });

    it("calculates token1 price correctly", () => {
      const pool = parsePool(exampleV2PoolA);
      expect(pool.token1Price.toFixed(6)).toBe("0.500000");
    });
  });

  describe("V3 pools", () => {
    describe("example pool A", () => {
      it("calculates token0 price correctly", () => {
        const pool = parsePool(exampleV3PoolA);
        expect(pool.token0Price.toFixed(8)).toBe("20039.89508504");
      });
      it("calculates token1 price correctly", () => {
        const pool = parsePool(exampleV3PoolA);
        expect(pool.token1Price.toFixed(8)).toBe("0.00004990");
      });

      it("converts tick correctly", () => {
        const pool = parsePool(exampleV3PoolA) as V3Pool;
        expect(pool.tick).toBe(99059);
      });
      it("converts liquidity correctly", () => {
        const pool = parsePool(exampleV3PoolA) as V3Pool;
        expect(pool.liquidity).toBe(1317444747259733306491692785n);
      });
      it("converts sqrtRatioX96 correctly", () => {
        const pool = parsePool(exampleV3PoolA) as V3Pool;
        expect(pool.sqrtRatioX96).toBe(11215723793643411978199961655566n);
      });
    });

    describe("example pool B", () => {
      it("calculates token0 price correctly", () => {
        const pool = parsePool(exampleV3PoolB);
        expect(pool.token0Price.toFixed(2)).toBe("4.57");
      });
      it("calculates token1 price correctly", () => {
        const pool = parsePool(exampleV3PoolB);
        expect(pool.token1Price.toFixed(2)).toBe("0.22");
      });
    });
  });

  describe("INVALID pools", () => {
    it("throws for invalid pool", () => {
      const mockInvalidPool: any = {
        version: "INVALID",
        token0: {
          address: "0x1000000000000000000000000000000000000000",
          decimals: 18,
        },
        token1: {
          address: "0x2000000000000000000000000000000000000000",
          decimals: 6,
        },
      };

      expect(() => parsePool(mockInvalidPool)).toThrow(InvalidPoolError);
    });
  });
});
