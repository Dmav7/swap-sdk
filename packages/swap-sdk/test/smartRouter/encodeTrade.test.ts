import { ADDRESS_THIS } from '../../src/smartRouter/consts'
import { encodeSmartRouterFunctionData } from '../../src/smartRouter/contractInterfaces'
import { encodeTrade } from '../../src/smartRouter/encodeTrade'
import { toJSON } from '../../src/utils'
import { nativeToVvsExactOutputTrade, vvsToNativeV3ExactOutputTrade } from '../fixtures/nativeExactOutputTrades'
import { nativeToVvsTrade, vvsToNativeTrade } from '../fixtures/nativeTokenTrades'
import {
  mutliHopV2MiddleExactInTrade,
  mutliHopV2MiddleExactOutTrade,
} from '../fixtures/smartRouter/multiHopV2MiddleTrades'
import { serialization } from '../helpers'

jest.mock('../../src/smartRouter/contractInterfaces', () => {
  const originalModule = jest.requireActual('../../src/smartRouter/contractInterfaces')
  return {
    encodeSmartRouterFunctionData: jest.fn((...args) => originalModule.encodeSmartRouterFunctionData(...args)),
  }
})
const spiedEncodeSmartRouterFunctionData = encodeSmartRouterFunctionData as jest.Mock

const recipient = '0x0000000000000000000000000000000000000003'

describe('encodeTrade', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('encodes NATIVE to VVS route', async () => {
    const trade = nativeToVvsTrade()

    const { calldata, value } = encodeTrade(trade, { recipient })

    expect(calldata).toBeDefined()
    expect(value).toBe(BigInt('0x763bfbd22000'))

    expect(spiedEncodeSmartRouterFunctionData.mock.calls).toHaveLength(2)

    const amountIn = { __serializeType: 'bigint', value: '130000000000000' }
    const amountOutMin = {
      __serializeType: 'bigint',
      value: '2781452881411358780',
    }
    const path = ['0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4', '0x904bd5a5aac0b9d88a0d47864724218986ad4a3a']
    const to = recipient
    expect(JSON.parse(toJSON(spiedEncodeSmartRouterFunctionData.mock.calls[0]))).toEqual([
      'swapExactTokensForTokens',
      [amountIn, amountOutMin, path, to],
    ])
  })

  it('encodes VVS to NATIVE route', async () => {
    const trade = vvsToNativeTrade()

    const { calldata, value } = encodeTrade(trade, { recipient })

    expect(calldata).toBeDefined()
    expect(value).toBe(0n)

    expect(spiedEncodeSmartRouterFunctionData.mock.calls).toHaveLength(3)
    {
      const amountIn = {
        __serializeType: 'bigint',
        value: '133000000000000000000',
      }
      const amountOutMin = {
        __serializeType: 'bigint',
        value: '6117605660552246',
      }
      const path = ['0x904bd5a5aac0b9d88a0d47864724218986ad4a3a', '0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4']
      const to = ADDRESS_THIS
      expect(JSON.parse(toJSON(spiedEncodeSmartRouterFunctionData.mock.calls[0]))).toEqual([
        'swapExactTokensForTokens',
        [amountIn, amountOutMin, path, to],
      ])
    }

    {
      const amountMinimum = 6117605660552246n
      expect(spiedEncodeSmartRouterFunctionData.mock.calls[1]).toEqual(['unwrapWETH9', [amountMinimum, recipient]])
    }
  })

  it('encodes NATIVE to VVS exactOutput route', async () => {
    const trade = nativeToVvsExactOutputTrade()

    const { calldata, value } = encodeTrade(trade, { recipient })

    expect(calldata).toBeDefined()
    expect(value).toBe(6730295569376219n)

    expect(spiedEncodeSmartRouterFunctionData.mock.calls).toHaveLength(3)

    const amountOut = BigInt('0x07ce66c50e28400000')
    const amountInMax = 6730295569376219n
    const path = ['0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4', '0x904bd5a5aac0b9d88a0d47864724218986ad4a3a']
    const to = recipient
    expect(spiedEncodeSmartRouterFunctionData.mock.calls[0]).toEqual([
      'swapTokensForExactTokens',
      [amountOut, amountInMax, path, to],
    ])

    expect(spiedEncodeSmartRouterFunctionData.mock.calls[1]).toEqual(['refundETH'])
  })

  it('encodes VVS to NATIVE V3 exactOutput route', async () => {
    const trade = vvsToNativeV3ExactOutputTrade()

    const { calldata, value } = encodeTrade(trade, { recipient })

    expect(calldata).toBeDefined()
    expect(value).toBe(0n)

    expect(spiedEncodeSmartRouterFunctionData.mock.calls).toHaveLength(3)

    expect(JSON.parse(toJSON(spiedEncodeSmartRouterFunctionData.mock.calls[0]))).toEqual([
      'exactOutputSingle',
      [
        {
          tokenIn: '0x904bd5a5aac0b9d88a0d47864724218986ad4a3a',
          tokenOut: '0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4',
          fee: 500,
          recipient: '0x0000000000000000000000000000000000000002',
          amountOut: {
            __serializeType: 'bigint',
            value: '2140000000000000000',
          },
          amountInMaximum: {
            __serializeType: 'bigint',
            value: '43121452281991778148895',
          },
          sqrtPriceLimitX96: 0,
        },
      ],
    ])

    {
      const amountMinimum = 2140000000000000000n
      expect(spiedEncodeSmartRouterFunctionData.mock.calls[1]).toEqual(['unwrapWETH9', [amountMinimum, recipient]])
    }
  })

  it('multi-hop exactIn with v2 in the middle', async () => {
    const trade = mutliHopV2MiddleExactInTrade()
    const { calldata, value } = encodeTrade(trade, { recipient })

    expect(calldata).toBeDefined()
    expect(value).toBe(10000000000000000000n)

    expect(spiedEncodeSmartRouterFunctionData.mock.calls).toHaveLength(4)

    expect(serialization(spiedEncodeSmartRouterFunctionData.mock.calls[0])).toEqual([
      'exactInputSingle',
      [
        {
          tokenIn: '0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4',
          tokenOut: '0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b',
          fee: 3000,
          recipient: '0x0000000000000000000000000000000000000002',
          amountIn: {
            __serializeType: 'bigint',
            value: '10000000000000000000',
          },
          amountOutMinimum: {
            __serializeType: 'bigint',
            value: '0',
          },
          sqrtPriceLimitX96: 0,
        },
      ],
    ])
    expect(serialization(spiedEncodeSmartRouterFunctionData.mock.calls[1])).toEqual([
      'swapExactTokensForTokens',
      [
        {
          __serializeType: 'bigint',
          value: '0',
        },
        {
          __serializeType: 'bigint',
          value: '0',
        },
        ['0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b', '0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4'],
        '0x0000000000000000000000000000000000000002',
      ],
    ])
    expect(serialization(spiedEncodeSmartRouterFunctionData.mock.calls[2])).toEqual([
      'exactInputSingle',
      [
        {
          tokenIn: '0x6a3173618859c7cd40faf6921b5e9eb6a76f1fd4',
          tokenOut: '0x904bd5a5aac0b9d88a0d47864724218986ad4a3a',
          fee: 10000,
          recipient: '0x0000000000000000000000000000000000000003',
          amountIn: {
            __serializeType: 'bigint',
            value: '0',
          },
          amountOutMinimum: {
            __serializeType: 'bigint',
            value: '1345649462352235396390871',
          },
          sqrtPriceLimitX96: 0,
        },
      ],
    ])
  })

  it('multi-hop exactOut with v2 in the middle', async () => {
    const trade = mutliHopV2MiddleExactOutTrade()

    expect(() => {
      encodeTrade(trade, { recipient })
    }).toThrow('encodeV2Swaps: does not support 0 amountOut with EXACT_OUTPUT')
  })
})
