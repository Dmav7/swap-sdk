import type { Trade } from "../../src";
import { fromJSON } from "../../src/utils";

export function nativeToVvsTrade(): Trade {
  return fromJSON(nativeToVvsTradeJSON);
}

export function vvsToNativeTrade(): Trade {
  return fromJSON(vvsToNativeTradeJSON);
}

const nativeToVvsTradeJSON = `
{
  "type": "EXACT_INPUT",
  "amountIn": {
    "amount": {
      "numerator": "13",
      "denominator": "100000"
    },
    "address": "NATIVE",
    "symbol": "WCRO",
    "decimals": 18
  },
  "amountOut": {
    "amount": {
      "numerator": "1397680072909207787",
      "denominator": "500000000000000000"
    },
    "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
    "symbol": "VVS",
    "decimals": 18
  },
  "routes": [
    {
      "amountIn": {
        "amount": {
          "numerator": "13",
          "denominator": "100000"
        },
        "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
        "symbol": "WCRO",
        "decimals": 18
      },
      "amountOut": {
        "amount": {
          "numerator": "1397680072909207787",
          "denominator": "500000000000000000"
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
            "numerator": "655639277418616786059873579051",
            "denominator": "30399448483581793686285835"
          },
          "token1Price": {
            "numerator": "30399448483581793686285835",
            "denominator": "655639277418616786059873579051"
          },
          "reserve0": {
            "amount": {
              "numerator": "6079889696716358737257167",
              "denominator": "200000000000000000"
            },
            "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
            "symbol": "WCRO",
            "decimals": 18
          },
          "reserve1": {
            "amount": {
              "numerator": "655639277418616786059873579051",
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
        "minimumReceived": {
          "amount": {
            "numerator": "1397680072909207787",
            "denominator": "502500000000000000"
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
    "numerator": "1397615072909207787",
    "denominator": "500000000000000000"
  },
  "lpFeeRatio": {
    "numerator": "3",
    "denominator": "1000"
  },
  "lpFee": {
    "amount": {
      "numerator": "39",
      "denominator": "100000000"
    },
    "address": "NATIVE",
    "symbol": "WCRO",
    "decimals": 18
  },
  "slippage": {
    "minimumReceived": {
      "amount": {
        "numerator": "1397680072909207787",
        "denominator": "502500000000000000"
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

const vvsToNativeTradeJSON = `
{
  "type": "EXACT_INPUT",
  "amountIn": {
    "amount": {
      "numerator": "133",
      "denominator": "1"
    },
    "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
    "symbol": "VVS",
    "decimals": 18
  },
  "amountOut": {
    "amount": {
      "numerator": "6148193688855007",
      "denominator": "1000000000000000000"
    },
    "address": "NATIVE",
    "symbol": "WCRO",
    "decimals": 18
  },
  "routes": [
    {
      "amountIn": {
        "amount": {
          "numerator": "133",
          "denominator": "1"
        },
        "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
        "symbol": "VVS",
        "decimals": 18
      },
      "amountOut": {
        "amount": {
          "numerator": "6148193688855007",
          "denominator": "1000000000000000000"
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
        "minimumReceived": {
          "amount": {
            "numerator": "6148193688855007",
            "denominator": "1005000000000000000"
          },
          "address": "0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4",
          "symbol": "WCRO",
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
    "numerator": "-132993851806311144993",
    "denominator": "1000000000000000000"
  },
  "lpFeeRatio": {
    "numerator": "3",
    "denominator": "1000"
  },
  "lpFee": {
    "amount": {
      "numerator": "399",
      "denominator": "1000"
    },
    "address": "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
    "symbol": "VVS",
    "decimals": 18
  },
  "slippage": {
    "minimumReceived": {
      "amount": {
        "numerator": "6148193688855007",
        "denominator": "1005000000000000000"
      },
      "address": "NATIVE",
      "symbol": "WCRO",
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
