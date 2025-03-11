import type { Trade } from '../../../src'
import { fromJSON } from '../../../src/utils'

export function mutliHopV2MiddleExactInTrade(): Trade {
  return fromJSON(mutliHopV2MiddleExactInTradeJSON)
}

export function mutliHopV2MiddleExactOutTrade(): Trade {
  return fromJSON(mutliHopV2MiddleExactOutTradeJSON)
}

const mutliHopV2MiddleExactInTradeJSON = `
{
  "type": "EXACT_INPUT",
  "amountIn": {
    "amount": {
      "numerator": "10",
      "denominator": "1"
    },
    "address": "NATIVE",
    "symbol": "WCRO",
    "decimals": 18
  },
  "amountOut": {
    "amount": {
      "numerator": "54095108386559862934913",
      "denominator": "40000000000000000"
    },
    "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
    "symbol": "VVS",
    "decimals": 18
  },
  "routes": [
    {
      "amountIn": {
        "amount": {
          "numerator": "10",
          "denominator": "1"
        },
        "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
        "symbol": "WCRO",
        "decimals": 18
      },
      "amountOut": {
        "amount": {
          "numerator": "54095108386559862934913",
          "denominator": "40000000000000000"
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
            "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
            "decimals": 18,
            "symbol": "WCRO"
          },
          "address": "0xad32686bddfce5e29f6a0fa7f44931608f6115c3",
          "version": "V3_3000",
          "token0Price": {
            "numerator": "2894056658183431462270479560304427865747388464283176365495766070481",
            "denominator": "627710173538668076383578942320766641610235544446403451289600000000"
          },
          "token1Price": {
            "numerator": "627710173538668076383578942320766641610235544446403451289600000000",
            "denominator": "2894056658183431462270479560304427865747388464283176365495766070481"
          },
          "liquidity": {
            "__serializeType": "bigint",
            "value": "1244735632627492581"
          },
          "sqrtRatioX96": {
            "__serializeType": "bigint",
            "value": "170119271635621325989253520698155900"
          },
          "tick": 291608
        },
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
            "numerator": "5591995653135747265138103",
            "denominator": "819983740195468750000000"
          },
          "token1Price": {
            "numerator": "819983740195468750000000",
            "denominator": "5591995653135747265138103"
          },
          "reserve0": {
            "amount": {
              "numerator": "5247895937251",
              "denominator": "200000"
            },
            "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
            "symbol": "USDC",
            "decimals": 6
          },
          "reserve1": {
            "amount": {
              "numerator": "5591995653135747265138103",
              "denominator": "31250000000000000"
            },
            "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
            "symbol": "WCRO",
            "decimals": 18
          }
        },
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
          "address": "0xc80da58c3063fee6e699a7eee884fb8aa6d4bc22",
          "version": "V3_10000",
          "token0Price": {
            "numerator": "569535678956866478210045620695005800411612587301037016015625",
            "denominator": "6129982163463555433433388108601236734474956488734408704"
          },
          "token1Price": {
            "numerator": "6129982163463555433433388108601236734474956488734408704",
            "denominator": "569535678956866478210045620695005800411612587301037016015625"
          },
          "liquidity": {
            "__serializeType": "bigint",
            "value": "1487120512498002071591256707"
          },
          "sqrtRatioX96": {
            "__serializeType": "bigint",
            "value": "24149628056179897895961498620000"
          },
          "tick": 114399
        }
      ],
      "path": [
        {
          "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
          "symbol": "WCRO",
          "decimals": 18
        },
        {
          "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
          "decimals": 6,
          "symbol": "USDC"
        },
        {
          "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
          "decimals": 18,
          "symbol": "WCRO"
        },
        {
          "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
          "decimals": 18,
          "symbol": "VVS"
        }
      ],
      "slippage": {
        "maximumSold": null,
        "minimumReceived": {
          "amount": {
            "numerator": "54095108386559862934913",
            "denominator": "40200000000000000"
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
    "numerator": "54095108386559862934913",
    "denominator": "400000000000000000"
  },
  "lpFeeRatio": {
    "numerator": "1593109",
    "denominator": "100000000"
  },
  "lpFee": {
    "amount": {
      "numerator": "1593109",
      "denominator": "10000000"
    },
    "address": "NATIVE",
    "symbol": "WCRO",
    "decimals": 18
  },
  "slippage": {
    "maximumSold": null,
    "minimumReceived": {
      "amount": {
        "numerator": "54095108386559862934913",
        "denominator": "40200000000000000"
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
`

const mutliHopV2MiddleExactOutTradeJSON = `
{
  "type": "EXACT_OUTPUT",
  "amountIn": {
    "amount": {
      "numerator": "19964974936149728033",
      "denominator": "1000000000000000000"
    },
    "address": "NATIVE",
    "symbol": "WCRO",
    "decimals": 18
  },
  "amountOut": {
    "amount": {
      "numerator": "2700000",
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
          "numerator": "19964974936149728033",
          "denominator": "1000000000000000000"
        },
        "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
        "symbol": "WCRO",
        "decimals": 18
      },
      "amountOut": {
        "amount": {
          "numerator": "2700000",
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
            "numerator": "2894056658183431462270479560304427865747388464283176365495766070481",
            "denominator": "627710173538668076383578942320766641610235544446403451289600000000"
          },
          "token1Price": {
            "numerator": "627710173538668076383578942320766641610235544446403451289600000000",
            "denominator": "2894056658183431462270479560304427865747388464283176365495766070481"
          },
          "liquidity": {
            "__serializeType": "bigint",
            "value": "1244735632627492581"
          },
          "sqrtRatioX96": {
            "__serializeType": "bigint",
            "value": "170119271635621325989253520698155900"
          },
          "tick": 291608
        },
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
            "numerator": "5591995653135747265138103",
            "denominator": "819983740195468750000000"
          },
          "token1Price": {
            "numerator": "819983740195468750000000",
            "denominator": "5591995653135747265138103"
          },
          "reserve0": {
            "amount": {
              "numerator": "5247895937251",
              "denominator": "200000"
            },
            "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
            "symbol": "USDC",
            "decimals": 6
          },
          "reserve1": {
            "amount": {
              "numerator": "5591995653135747265138103",
              "denominator": "31250000000000000"
            },
            "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
            "symbol": "WCRO",
            "decimals": 18
          }
        },
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
          "address": "0xc80da58c3063fee6e699a7eee884fb8aa6d4bc22",
          "version": "V3_10000",
          "token0Price": {
            "numerator": "569535678956866478210045620695005800411612587301037016015625",
            "denominator": "6129982163463555433433388108601236734474956488734408704"
          },
          "token1Price": {
            "numerator": "6129982163463555433433388108601236734474956488734408704",
            "denominator": "569535678956866478210045620695005800411612587301037016015625"
          },
          "liquidity": {
            "__serializeType": "bigint",
            "value": "1487120512498002071591256707"
          },
          "sqrtRatioX96": {
            "__serializeType": "bigint",
            "value": "24149628056179897895961498620000"
          },
          "tick": 114399
        }
      ],
      "path": [
        {
          "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
          "symbol": "WCRO",
          "decimals": 18
        },
        {
          "address": "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
          "decimals": 6,
          "symbol": "USDC"
        },
        {
          "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
          "decimals": 18,
          "symbol": "WCRO"
        },
        {
          "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
          "decimals": 18,
          "symbol": "VVS"
        }
      ],
      "slippage": {
        "minimumReceived": null,
        "maximumSold": {
          "amount": {
            "numerator": "4012959962166095334633",
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
    "numerator": "2700000000000000000000000",
    "denominator": "19964974936149728033"
  },
  "lpFeeRatio": {
    "numerator": "1593109",
    "denominator": "100000000"
  },
  "lpFee": {
    "amount": {
      "numerator": "31806381255554557076924597",
      "denominator": "100000000000000000000000000"
    },
    "address": "NATIVE",
    "symbol": "WCRO",
    "decimals": 18
  },
  "slippage": {
    "minimumReceived": null,
    "maximumSold": {
      "amount": {
        "numerator": "4012959962166095334633",
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
