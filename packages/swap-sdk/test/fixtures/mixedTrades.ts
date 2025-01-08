import type { Trade, TradeRoute } from "../../src";
import { fromJSON } from "../../src/utils";

export function usdcToFulMixedTrade(): Trade {
  return fromJSON(usdcToFulMixedTradeJSON);
}
export function usdcToFulMixedTradeRoute(): TradeRoute {
  return usdcToFulMixedTrade().routes[0];
}

const usdcToFulMixedTradeJSON = `
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
      "numerator": "5980588741109328607",
      "denominator": "500000000000000000"
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
          "numerator": "5980588741109328607",
          "denominator": "500000000000000000"
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
          "address": "0xac7901efb1f279a18e3f1973664cf4057ddbf0d9",
          "version": "V2",
          "token0Price": {
            "numerator": "18412164492021495423221181",
            "denominator": "2550120114907400000000000"
          },
          "token1Price": {
            "numerator": "2550120114907400000000000",
            "denominator": "18412164492021495423221181"
          },
          "reserve0": {
            "amount": {
              "numerator": "12750600574537",
              "denominator": "500000"
            },
            "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
            "symbol": "USDC",
            "decimals": 6
          },
          "reserve1": {
            "amount": {
              "numerator": "18412164492021495423221181",
              "denominator": "100000000000000000"
            },
            "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
            "symbol": "WCRO",
            "decimals": 18
          }
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
        "minimumReceived": {
          "amount": {
            "numerator": "5980588741109328607",
            "denominator": "502500000000000000"
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
    "numerator": "5915588741109328607",
    "denominator": "500000000000000000"
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
        "numerator": "5980588741109328607",
        "denominator": "502500000000000000"
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
