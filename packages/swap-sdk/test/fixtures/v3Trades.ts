import type { Trade, TradeRoute } from "../../src";
import { fromJSON } from "../../src/utils";

export function usdcToVvsV3SimpleTrade(): Trade {
  return fromJSON(usdcToVvsV3SimpleTradeJSON);
}
export function usdcToVvsV3SimpleTradeRoute(): TradeRoute {
  return usdcToVvsV3SimpleTrade().routes[0];
}

export function vvsToUsdcV3ExactOutputTrade(): Trade {
  return fromJSON(vvsToUsdcV3ExactOutputTradeJSON);
}
export function vvsToUsdcV3ExactOutputTradeRoute(): TradeRoute {
  return vvsToUsdcV3ExactOutputTrade().routes[0];
}

const usdcToVvsV3SimpleTradeJSON = `
{
  "type": "EXACT_INPUT",
  "amountIn": {
    "amount": {
      "numerator": "27",
      "denominator": "5"
    },
    "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
    "symbol": "USDC",
    "decimals": 6
  },
  "amountOut": {
    "amount": {
      "numerator": "554837643939273474749787",
      "denominator": "1000000000000000000"
    },
    "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
    "symbol": "VVS",
    "decimals": 18
  },
  "routes": [
    {
      "amountIn": {
        "amount": {
          "numerator": "27",
          "denominator": "5"
        },
        "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
        "symbol": "USDC",
        "decimals": 6
      },
      "amountOut": {
        "amount": {
          "numerator": "554837643939273474749787",
          "denominator": "1000000000000000000"
        },
        "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
        "symbol": "VVS",
        "decimals": 18
      },
      "percentage": {
        "numerator": "1",
        "denominator": "1"
      },
      "pool": [
        {
          "token0": {
            "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
            "decimals": 6,
            "symbol": "USDC"
          },
          "token1": {
            "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
            "decimals": 18,
            "symbol": "VVS"
          },
          "address": "0x9504768aba141e7a097c5205154943b373e5a0e5",
          "version": "V3_500",
          "token0Price": {
            "numerator": "2135826467127787620658378172340578879409046921160902883960306419552291698753478902314850647656281",
            "denominator": "6277101735386680763835789423207666416102355444464034512896000000000000"
          },
          "token1Price": {
            "numerator": "6277101735386680763835789423207666416102355444464034512896000000000000",
            "denominator": "2135826467127787620658378172340578879409046921160902883960306419552291698753478902314850647656281"
          },
          "liquidity": {
            "__serializeType": "bigint",
            "value": "0"
          },
          "sqrtRatioX96": {
            "__serializeType": "bigint",
            "value": "1461446703485210103287273052203988822378723970341"
          },
          "tick": 887271
        }
      ],
      "path": [
        {
          "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
          "symbol": "USDC",
          "decimals": 6
        },
        {
          "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
          "decimals": 18,
          "symbol": "VVS"
        }
      ],
      "slippage": {
        "minimumReceived": {
          "amount": {
            "numerator": "184945881313091158249929",
            "denominator": "335000000000000000"
          },
          "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
          "symbol": "VVS",
          "decimals": 18
        },
        "type": "minimumReceived",
        "tolerance": {
          "numerator": "1",
          "denominator": "200"
        }
      }
    }
  ],
  "price": {
    "numerator": "554832243939273474749787",
    "denominator": "1000000000000000000"
  },
  "lpFeeRatio": {
    "numerator": "1",
    "denominator": "2000"
  },
  "lpFee": {
    "amount": {
      "numerator": "27",
      "denominator": "10000"
    },
    "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
    "symbol": "USDC",
    "decimals": 6
  },
  "slippage": {
    "minimumReceived": {
      "amount": {
        "numerator": "184945881313091158249929",
        "denominator": "335000000000000000"
      },
      "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
      "symbol": "VVS",
      "decimals": 18
    },
    "type": "minimumReceived",
    "tolerance": {
      "numerator": "1",
      "denominator": "200"
    }
  }
}
`;

const vvsToUsdcV3ExactOutputTradeJSON = `
{
  "type": "EXACT_OUTPUT",
  "amountIn": {
    "amount": {
      "numerator": "726561885073825033814903",
      "denominator": "500000000000000000"
    },
    "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
    "symbol": "VVS",
    "decimals": 18
  },
  "amountOut": {
    "amount": {
      "numerator": "59",
      "denominator": "10"
    },
    "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
    "symbol": "USDC",
    "decimals": 6
  },
  "routes": [
    {
      "amountIn": {
        "amount": {
          "numerator": "726561885073825033814903",
          "denominator": "500000000000000000"
        },
        "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
        "symbol": "VVS",
        "decimals": 18
      },
      "amountOut": {
        "amount": {
          "numerator": "59",
          "denominator": "10"
        },
        "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
        "symbol": "USDC",
        "decimals": 6
      },
      "percentage": {
        "numerator": "1",
        "denominator": "1"
      },
      "pool": [
        {
          "token0": {
            "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
            "decimals": 6,
            "symbol": "USDC"
          },
          "token1": {
            "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
            "decimals": 18,
            "symbol": "VVS"
          },
          "address": "0x6c533b834870fec5119c52c55446e0aaf29a3e4a",
          "version": "V3_3000",
          "token0Price": {
            "numerator": "14552588179449288713518327351202434007488122709410090613337813109501282601",
            "denominator": "62771017353866807638357894232076664161023554444640345128960000000000"
          },
          "token1Price": {
            "numerator": "62771017353866807638357894232076664161023554444640345128960000000000",
            "denominator": "14552588179449288713518327351202434007488122709410090613337813109501282601"
          },
          "liquidity": {
            "__serializeType": "bigint",
            "value": "36762244963252380"
          },
          "sqrtRatioX96": {
            "__serializeType": "bigint",
            "value": "38147854696495435709777288790186400510"
          },
          "tick": 399868
        }
      ],
      "path": [
        {
          "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
          "symbol": "VVS",
          "decimals": 18
        },
        {
          "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
          "decimals": 6,
          "symbol": "USDC"
        }
      ],
      "slippage": {
        "maximumSold": {
          "amount": {
            "numerator": "146038938899838831796795503",
            "denominator": "100000000000000000000"
          },
          "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
          "symbol": "VVS",
          "decimals": 18
        },
        "type": "maximumSold",
        "tolerance": {
          "numerator": "1",
          "denominator": "200"
        }
      }
    }
  ],
  "price": {
    "numerator": "-726558935073825033814903",
    "denominator": "500000000000000000"
  },
  "lpFeeRatio": {
    "numerator": "3",
    "denominator": "1000"
  },
  "lpFee": {
    "amount": {
      "numerator": "2179685655221475101444709",
      "denominator": "500000000000000000000"
    },
    "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
    "symbol": "VVS",
    "decimals": 18
  },
  "slippage": {
    "maximumSold": {
      "amount": {
        "numerator": "146038938899838831796795503",
        "denominator": "100000000000000000000"
      },
      "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
      "symbol": "VVS",
      "decimals": 18
    },
    "type": "maximumSold",
    "tolerance": {
      "numerator": "1",
      "denominator": "200"
    }
  }
}
`;
