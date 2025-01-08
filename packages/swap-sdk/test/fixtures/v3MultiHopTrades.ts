import type { Trade, TradeRoute } from "../../src";
import { fromJSON } from "../../src/utils";

export function usdcToFulV3MultiHopTrade(): Trade {
  return fromJSON(usdcToFulV3MultiHopTradeJSON);
}
export function usdcToFulV3MultiHopTradeRoute(): TradeRoute {
  return usdcToFulV3MultiHopTrade().routes[0];
}

export function usdcToFulV3MultiHopExactOutputTrade(): Trade {
  return fromJSON(usdcToFulV3MultiHopExactOutputTradeJSON);
}
export function usdcToFulV3MultiHopExactOutputTradeRoute(): TradeRoute {
  return usdcToFulV3MultiHopExactOutputTrade().routes[0];
}

const usdcToFulV3MultiHopTradeJSON = `
{
  "type": "EXACT_INPUT",
  "amountIn": {
    "amount": {
      "numerator": "13",
      "denominator": "100"
    },
    "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
    "symbol": "USDC",
    "decimals": 6
  },
  "amountOut": {
    "amount": {
      "numerator": "951444540649825659",
      "denominator": "125000000000000000"
    },
    "address": "0x2e755bf30938b64281900d2219c3842d509e9d92",
    "symbol": "FUL",
    "decimals": 18
  },
  "routes": [
    {
      "amountIn": {
        "amount": {
          "numerator": "13",
          "denominator": "100"
        },
        "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
        "symbol": "USDC",
        "decimals": 6
      },
      "amountOut": {
        "amount": {
          "numerator": "951444540649825659",
          "denominator": "125000000000000000"
        },
        "address": "0x2e755bf30938b64281900d2219c3842d509e9d92",
        "symbol": "FUL",
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
            "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
            "decimals": 18,
            "symbol": "WCRO"
          },
          "address": "0xad32686bddfce5e29f6a0fa7f44931608f6115c3",
          "version": "V3_3000",
          "token0Price": {
            "numerator": "7172765079061544031057371379564537852812364048391802233739063633447401",
            "denominator": "1569275433846670190958947355801916604025588861116008628224000000000000"
          },
          "token1Price": {
            "numerator": "1569275433846670190958947355801916604025588861116008628224000000000000",
            "denominator": "7172765079061544031057371379564537852812364048391802233739063633447401"
          },
          "liquidity": {
            "__serializeType": "bigint",
            "value": "1305834139233645876"
          },
          "sqrtRatioX96": {
            "__serializeType": "bigint",
            "value": "169384356763681622230272155080242598"
          },
          "tick": 291521
        },
        {
          "token0": {
            "address": "0x2e755bf30938b64281900d2219c3842d509e9d92",
            "decimals": 18,
            "symbol": "FUL"
          },
          "token1": {
            "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
            "decimals": 18,
            "symbol": "WCRO"
          },
          "address": "0x1d9b780b5f76c9400d99517bba632218eee1acaa",
          "version": "V3_3000",
          "token0Price": {
            "numerator": "486170015890923236070561890950926210018668832403681625625",
            "denominator": "6277101735386680763835789423207666416102355444464034512896"
          },
          "token1Price": {
            "numerator": "6277101735386680763835789423207666416102355444464034512896",
            "denominator": "486170015890923236070561890950926210018668832403681625625"
          },
          "liquidity": {
            "__serializeType": "bigint",
            "value": "1124972807407212528290"
          },
          "sqrtRatioX96": {
            "__serializeType": "bigint",
            "value": "22049263386583308626322507525"
          },
          "tick": -25583
        }
      ],
      "path": [
        {
          "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
          "symbol": "USDC",
          "decimals": 6
        },
        {
          "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
          "decimals": 18,
          "symbol": "WCRO"
        },
        {
          "address": "0x2e755bf30938b64281900d2219c3842d509e9d92",
          "decimals": 18,
          "symbol": "FUL"
        }
      ],
      "slippage": {
        "minimumReceived": {
          "amount": {
            "numerator": "317148180216608553",
            "denominator": "41875000000000000"
          },
          "address": "0x2e755bf30938b64281900d2219c3842d509e9d92",
          "symbol": "FUL",
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
    "numerator": "935194540649825659",
    "denominator": "125000000000000000"
  },
  "lpFeeRatio": {
    "numerator": "5991",
    "denominator": "1000000"
  },
  "lpFee": {
    "amount": {
      "numerator": "77883",
      "denominator": "100000000"
    },
    "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
    "symbol": "USDC",
    "decimals": 6
  },
  "slippage": {
    "minimumReceived": {
      "amount": {
        "numerator": "317148180216608553",
        "denominator": "41875000000000000"
      },
      "address": "0x2e755bf30938b64281900d2219c3842d509e9d92",
      "symbol": "FUL",
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

const usdcToFulV3MultiHopExactOutputTradeJSON = `
{
  "type": "EXACT_OUTPUT",
  "amountIn": {
    "amount": {
      "numerator": "4449",
      "denominator": "31250"
    },
    "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
    "symbol": "USDC",
    "decimals": 6
  },
  "amountOut": {
    "amount": {
      "numerator": "83",
      "denominator": "10"
    },
    "address": "0x2e755bf30938b64281900d2219c3842d509e9d92",
    "symbol": "FUL",
    "decimals": 18
  },
  "routes": [
    {
      "amountIn": {
        "amount": {
          "numerator": "4449",
          "denominator": "31250"
        },
        "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
        "symbol": "USDC",
        "decimals": 6
      },
      "amountOut": {
        "amount": {
          "numerator": "83",
          "denominator": "10"
        },
        "address": "0x2e755bf30938b64281900d2219c3842d509e9d92",
        "symbol": "FUL",
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
            "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
            "decimals": 18,
            "symbol": "WCRO"
          },
          "address": "0xad32686bddfce5e29f6a0fa7f44931608f6115c3",
          "version": "V3_3000",
          "token0Price": {
            "numerator": "28691047036205753812885506894847068013628120808375399468324656009201929",
            "denominator": "6277101735386680763835789423207666416102355444464034512896000000000000"
          },
          "token1Price": {
            "numerator": "6277101735386680763835789423207666416102355444464034512896000000000000",
            "denominator": "28691047036205753812885506894847068013628120808375399468324656009201929"
          },
          "liquidity": {
            "__serializeType": "bigint",
            "value": "1305834139233645876"
          },
          "sqrtRatioX96": {
            "__serializeType": "bigint",
            "value": "169384317562771299825160233069117827"
          },
          "tick": 291521
        },
        {
          "token0": {
            "address": "0x2e755bf30938b64281900d2219c3842d509e9d92",
            "decimals": 18,
            "symbol": "FUL"
          },
          "token1": {
            "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
            "decimals": 18,
            "symbol": "WCRO"
          },
          "address": "0x1d9b780b5f76c9400d99517bba632218eee1acaa",
          "version": "V3_3000",
          "token0Price": {
            "numerator": "29097359132282257908697012653454169552905743122521",
            "denominator": "374144419156711147060143317175368453031918731001856"
          },
          "token1Price": {
            "numerator": "374144419156711147060143317175368453031918731001856",
            "denominator": "29097359132282257908697012653454169552905743122521"
          },
          "liquidity": {
            "__serializeType": "bigint",
            "value": "1124972807407212528290"
          },
          "sqrtRatioX96": {
            "__serializeType": "bigint",
            "value": "22094630098552725349763231744"
          },
          "tick": -25542
        }
      ],
      "path": [
        {
          "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
          "symbol": "USDC",
          "decimals": 6
        },
        {
          "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
          "decimals": 18,
          "symbol": "WCRO"
        },
        {
          "address": "0x2e755bf30938b64281900d2219c3842d509e9d92",
          "decimals": 18,
          "symbol": "FUL"
        }
      ],
      "slippage": {
        "maximumSold": {
          "amount": {
            "numerator": "894249",
            "denominator": "6250000"
          },
          "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
          "symbol": "USDC",
          "decimals": 6
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
    "numerator": "127463",
    "denominator": "15625"
  },
  "lpFeeRatio": {
    "numerator": "5991",
    "denominator": "1000000"
  },
  "lpFee": {
    "amount": {
      "numerator": "26653959",
      "denominator": "31250000000"
    },
    "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
    "symbol": "USDC",
    "decimals": 6
  },
  "slippage": {
    "maximumSold": {
      "amount": {
        "numerator": "894249",
        "denominator": "6250000"
      },
      "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
      "symbol": "USDC",
      "decimals": 6
    },
    "type": "maximumSold",
    "tolerance": {
      "numerator": "1",
      "denominator": "200"
    }
  }
}
`;
