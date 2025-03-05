import { TradeType } from '../../src'
import { encodeSmartRouterFunctionData } from '../../src/smartRouter/contractInterfaces'
import { encodeSwaps } from '../../src/smartRouter/encodeSwaps'
import { toJSON } from '../../src/utils'
import { usdcToFulMixedTradeRoute } from '../fixtures/mixedTrades'

jest.mock('../../src/smartRouter/contractInterfaces', () => {
  const originalModule = jest.requireActual('../../src/smartRouter/contractInterfaces')
  return {
    encodeSmartRouterFunctionData: jest.fn((...args) => originalModule.encodeSmartRouterFunctionData(...args)),
  }
})
const spiedEncodeSmartRouterFunctionData = encodeSmartRouterFunctionData as jest.Mock

describe('encodeSwaps', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('encodes usdc to ful mixed route', async () => {
    const route = usdcToFulMixedTradeRoute()

    encodeSwaps(route, TradeType.EXACT_INPUT, false, {
      recipient: '0x0000000000000000000000000000000000000003',
    })

    expect(spiedEncodeSmartRouterFunctionData.mock.calls).toHaveLength(2)
    expect(spiedEncodeSmartRouterFunctionData.mock.calls[0]).toEqual([
      'swapExactTokensForTokens',
      [
        BigInt('0x01fbd0'),
        0n,
        ['0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b', '0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4'],
        '0x0000000000000000000000000000000000000002',
      ],
    ])
    expect(JSON.parse(toJSON(spiedEncodeSmartRouterFunctionData.mock.calls[1]))).toEqual([
      'exactInputSingle',
      [
        {
          amountIn: {
            __serializeType: 'bigint',
            value: '0',
          },
          amountOutMinimum: {
            __serializeType: 'bigint',
            value: '11901669136535977327',
          },
          fee: 3000,
          recipient: '0x0000000000000000000000000000000000000003',
          sqrtPriceLimitX96: 0,
          tokenIn: '0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4',
          tokenOut: '0x2e755bf30938b64281900d2219c3842d509e9d92',
        },
      ],
    ])
  })
})
