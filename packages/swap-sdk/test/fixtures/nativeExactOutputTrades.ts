import type { Trade } from '../../src'
import { fromJSON } from '../../src/utils'

export function nativeToVvsExactOutputTrade(): Trade {
  return fromJSON(nativeToVvsExactOutputTradeJSON)
}

export function vvsToNativeV3ExactOutputTrade(): Trade {
  return fromJSON(vvsToNativeV3ExactOutputTradeJSON)
}

const nativeToVvsExactOutputTradeJSON = `
{
  "type": "EXACT_OUTPUT",
  "amountIn": {
    "amount": {
      "numerator": "6696811511817133",
      "denominator": "1000000000000000000"
    },
    "address": "NATIVE",
    "symbol": "WCRO",
    "decimals": 18
  },
  "amountOut": {
    "amount": {
      "numerator": "144",
      "denominator": "1"
    },
    "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
    "symbol": "VVS",
    "decimals": 18
  },
  "routes": [
    {
      "amountIn": {
        "amount": {
          "numerator": "6696811511817133",
          "denominator": "1000000000000000000"
        },
        "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
        "symbol": "WCRO",
        "decimals": 18
      },
      "amountOut": {
        "amount": {
          "numerator": "144",
          "denominator": "1"
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
            "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
            "decimals": 18,
            "symbol": "WCRO"
          },
          "token1": {
            "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
            "decimals": 18,
            "symbol": "VVS"
          },
          "address": "0x3f3465b412b6017e20af7abffab67698de8cfa7a",
          "version": "V2",
          "token0Price": {
            "numerator": "655639277415821425914055163477",
            "denominator": "30399448483711793686285835"
          },
          "token1Price": {
            "numerator": "30399448483711793686285835",
            "denominator": "655639277415821425914055163477"
          },
          "reserve0": {
            "amount": {
              "numerator": "6079889696742358737257167",
              "denominator": "200000000000000000"
            },
            "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
            "symbol": "WCRO",
            "decimals": 18
          },
          "reserve1": {
            "amount": {
              "numerator": "655639277415821425914055163477",
              "denominator": "1000000000000000000"
            },
            "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
            "symbol": "VVS",
            "decimals": 18
          }
        }
      ],
      "path": [
        {
          "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
          "symbol": "WCRO",
          "decimals": 18
        },
        {
          "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
          "decimals": 18,
          "symbol": "VVS"
        }
      ],
      "slippage": {
        "maximumSold": {
          "amount": {
            "numerator": "1346059113875243733",
            "denominator": "200000000000000000000"
          },
          "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
          "symbol": "WCRO",
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
    "numerator": "143993303188488182867",
    "denominator": "1000000000000000000"
  },
  "lpFeeRatio": {
    "numerator": "3",
    "denominator": "1000"
  },
  "lpFee": {
    "amount": {
      "numerator": "20090434535451399",
      "denominator": "1000000000000000000000"
    },
    "address": "NATIVE",
    "symbol": "WCRO",
    "decimals": 18
  },
  "slippage": {
    "maximumSold": {
      "amount": {
        "numerator": "1346059113875243733",
        "denominator": "200000000000000000000"
      },
      "address": "NATIVE",
      "symbol": "WCRO",
      "decimals": 18
    },
    "type": "maximumSold",
    "tolerance": {
      "numerator": "1",
      "denominator": "200"
    }
  }
}
`

const vvsToNativeV3ExactOutputTradeJSON = `
{
  "type": "EXACT_OUTPUT",
  "amountIn": {
    "amount": {
      "numerator": "8581383538704831472417",
      "denominator": "200000000000000000"
    },
    "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
    "symbol": "VVS",
    "decimals": 18
  },
  "amountOut": {
    "amount": {
      "numerator": "107",
      "denominator": "50"
    },
    "address": "NATIVE",
    "symbol": "WCRO",
    "decimals": 18
  },
  "routes": [
    {
      "amountIn": {
        "amount": {
          "numerator": "8581383538704831472417",
          "denominator": "200000000000000000"
        },
        "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
        "symbol": "VVS",
        "decimals": 18
      },
      "amountOut": {
        "amount": {
          "numerator": "107",
          "denominator": "50"
        },
        "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
        "symbol": "WCRO",
        "decimals": 18
      },
      "percentage": {
        "numerator": "1",
        "denominator": "1"
      },
      "pool": [
        {
          "token0": {
            "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
            "decimals": 18,
            "symbol": "WCRO"
          },
          "token1": {
            "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
            "decimals": 18,
            "symbol": "VVS"
          },
          "address": "0xe92cd986bfa8cd0b521b84871ce9c4d12a60b728",
          "version": "V3_500",
          "token0Price": {
            "numerator": "125792691621121389482637186254563697693091489012549199722350041",
            "denominator": "6277101735386680763835789423207666416102355444464034512896"
          },
          "token1Price": {
            "numerator": "6277101735386680763835789423207666416102355444464034512896",
            "denominator": "125792691621121389482637186254563697693091489012549199722350041"
          },
          "liquidity": {
            "__serializeType": "bigint",
            "value": "1317444747259733306491692785"
          },
          "sqrtRatioX96": {
            "__serializeType": "bigint",
            "value": "11215734109772814576048538878821"
          },
          "tick": 99059
        }
      ],
      "path": [
        {
          "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
          "symbol": "VVS",
          "decimals": 18
        },
        {
          "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
          "decimals": 18,
          "symbol": "WCRO"
        }
      ],
      "slippage": {
        "maximumSold": {
          "amount": {
            "numerator": "1724858091279671125955817",
            "denominator": "40000000000000000000"
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
    "numerator": "-8580955538704831472417",
    "denominator": "200000000000000000"
  },
  "lpFeeRatio": {
    "numerator": "1",
    "denominator": "2000"
  },
  "lpFee": {
    "amount": {
      "numerator": "8581383538704831472417",
      "denominator": "400000000000000000000"
    },
    "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
    "symbol": "VVS",
    "decimals": 18
  },
  "slippage": {
    "maximumSold": {
      "amount": {
        "numerator": "1724858091279671125955817",
        "denominator": "40000000000000000000"
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
`
