import { Fraction } from "bi-fraction";

import type { Trade, TradeRoute } from "../../src";
import { PoolType, TradeType } from "../../src";

export function usdcToVvsV2Trade(): Trade {
  return {
    type: TradeType.EXACT_INPUT,
    amountIn: {
      amount: new Fraction("6", "5"),
      address: "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
      symbol: "USDC",
      decimals: 6,
    },
    amountOut: {
      amount: new Fraction("91990315104188086340441", "500000000000000000"),
      address: "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
      symbol: "VVS",
      decimals: 18,
    },
    routes: [
      {
        amountIn: {
          amount: new Fraction("6", "5"),
          address: "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
          symbol: "USDC",
          decimals: 6,
        },
        amountOut: {
          amount: new Fraction("91990315104188086340441", "500000000000000000"),
          address: "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
          symbol: "VVS",
          decimals: 18,
        },
        percentage: new Fraction("1", "1"),
        slippage: {
          minimumReceived: {
            amount: new Fraction(
              "91990315104188086340441",
              "502500000000000000",
            ),
            address: "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
            symbol: "VVS",
            decimals: 18,
          },
          type: "minimumReceived",
          tolerance: new Fraction("1", "200"),
        },
        pool: [
          {
            token0: {
              address: "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
              decimals: 6,
              symbol: "USDC",
            },
            token1: {
              address: "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
              decimals: 18,
              symbol: "VVS",
            },
            address: "0x9e3a0434ed428dfde5ace779ead35e141dd95eff",
            version: PoolType.V2,
            token0Price: new Fraction(
              "515952927702237770555932702981",
              "3355168269326000000000000",
            ),
            token1Price: new Fraction(
              "3355168269326000000000000",
              "515952927702237770555932702981",
            ),
            reserve0: {
              amount: new Fraction("1677584134663", "250000"),
              address: "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
              symbol: "USDC",
              decimals: 6,
            },
            reserve1: {
              amount: new Fraction(
                "515952927702237770555932702981",
                "500000000000000000",
              ),
              address: "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
              symbol: "VVS",
              decimals: 18,
            },
          },
        ],
        path: [
          {
            address: "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
            symbol: "USDC",
            decimals: 6,
          },
          {
            address: "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
            symbol: "VVS",
            decimals: 18,
          },
        ],
      },
    ],
    price: new Fraction("91989715104188086340441", "500000000000000000"),
    lpFeeRatio: new Fraction("3", "1000"),
    lpFee: {
      amount: new Fraction("9", "2500"),
      address: "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
      symbol: "USDC",
      decimals: 6,
    },
    slippage: {
      minimumReceived: {
        amount: new Fraction("91990315104188086340441", "502500000000000000"),
        address: "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
        symbol: "VVS",
        decimals: 18,
      },
      type: "minimumReceived",
      tolerance: new Fraction("1", "200"),
    },
  };
}

export function usdcToVvsV2TradeRoute(): TradeRoute {
  return usdcToVvsV2Trade().routes[0];
}

export function vvsToUsdcV2ExactOutputTrade(): Trade {
  return {
    type: TradeType.EXACT_OUTPUT,
    amountIn: {
      amount: new Fraction("724934517530509367956631", "1000000000000000000"),
      address: "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
      symbol: "VVS",
      decimals: 18,
    },
    amountOut: {
      amount: new Fraction("47", "10"),
      address: "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
      symbol: "USDC",
      decimals: 6,
    },
    routes: [
      {
        amountIn: {
          amount: new Fraction(
            "724934517530509367956631",
            "1000000000000000000",
          ),
          address: "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
          symbol: "VVS",
          decimals: 18,
        },
        amountOut: {
          amount: new Fraction("47", "10"),
          address: "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
          symbol: "USDC",
          decimals: 6,
        },
        percentage: new Fraction("1", "1"),
        slippage: {
          maximumSold: {
            amount: new Fraction(
              "145711838023632382959282831",
              "200000000000000000000",
            ),
            address: "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
            symbol: "VVS",
            decimals: 18,
          },
          type: "maximumSold",
          tolerance: new Fraction("1", "200"),
        },
        pool: [
          {
            token0: {
              address: "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
              decimals: 6,
              symbol: "USDC",
            },
            token1: {
              address: "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
              decimals: 18,
              symbol: "VVS",
            },
            address: "0x9e3a0434ed428dfde5ace779ead35e141dd95eff",
            version: PoolType.V2,
            token0Price: new Fraction(
              "515952927702237770555932702981",
              "3355168269326000000000000",
            ),
            token1Price: new Fraction(
              "3355168269326000000000000",
              "515952927702237770555932702981",
            ),
            reserve0: {
              amount: new Fraction("1677584134663", "250000"),
              address: "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
              symbol: "USDC",
              decimals: 6,
            },
            reserve1: {
              amount: new Fraction(
                "515952927702237770555932702981",
                "500000000000000000",
              ),
              address: "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
              symbol: "VVS",
              decimals: 18,
            },
          },
        ],
        path: [
          {
            address: "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
            symbol: "VVS",
            decimals: 18,
          },
          {
            address: "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
            symbol: "USDC",
            decimals: 6,
          },
        ],
      },
    ],
    price: new Fraction("-724929817530509367956631", "1000000000000000000"),
    lpFeeRatio: new Fraction("3", "1000"),
    lpFee: {
      amount: new Fraction(
        "2174803552591528103869893",
        "1000000000000000000000",
      ),
      address: "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
      symbol: "VVS",
      decimals: 18,
    },
    slippage: {
      maximumSold: {
        amount: new Fraction(
          "145711838023632382959282831",
          "200000000000000000000",
        ),
        address: "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
        symbol: "VVS",
        decimals: 18,
      },
      type: "maximumSold",
      tolerance: new Fraction("1", "200"),
    },
  };
}
export function vvsToUsdcV2ExactOutputTradeRoute(): TradeRoute {
  return vvsToUsdcV2ExactOutputTrade().routes[0];
}
