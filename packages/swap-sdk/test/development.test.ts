import { fetchBestTrade, BuiltInChainId, prepareTradeTxRequest, PoolType } from '../src'
import { encodeSmartRouterFunctionData } from '../src/smartRouter/contractInterfaces'
import { serialization, useFixture } from './helpers'

jest.mock('../src/smartRouter/contractInterfaces', () => {
  const originalModule = jest.requireActual('../src/smartRouter/contractInterfaces')
  return {
    encodeSmartRouterFunctionData: jest.fn((...args) => originalModule.encodeSmartRouterFunctionData(...args)),
  }
})
const spiedEncodeSmartRouterFunctionData = encodeSmartRouterFunctionData as jest.Mock

describe('development', () => {
  it.skip('runs through whole flow on mainnet: fetchBestTrade & prepareTradeTxRequest', async () => {
    const walletAddress = '0x0000000000000000000000000000000000000003'

    const chainId = BuiltInChainId.CRONOS_MAINNET
    const inputToken = 'NATIVE'
    const outputToken = '0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03'
    const amount = '2.5'

    await expect(
      fetchBestTrade(chainId, inputToken, outputToken, amount, {
        poolTypes: [PoolType.V2, PoolType.V3_100, PoolType.V3_500, PoolType.V3_3000, PoolType.V3_10000],
      }).then(async (trade) => {
        console.log(trade)
        useFixture(serialization(trade), __filename, 'mainnet-trade.json', true)

        const txRequest = prepareTradeTxRequest(chainId, trade, walletAddress)
        console.log(txRequest)
        return txRequest
      }),
    ).resolves.toBeDefined()

    useFixture(serialization(spiedEncodeSmartRouterFunctionData.mock.calls), __filename, 'mainnet-calls.json', true)
  }, 0)

  it.skip('runs through whole flow on testnet: fetchBestTrade & prepareTradeTxRequest', async () => {
    const walletAddress = '0x0000000000000000000000000000000000000003'

    const chainId = BuiltInChainId.CRONOS_TESTNET
    const inputToken = 'NATIVE'
    const outputToken = '0x904Bd5a5AAC0B9d88A0D47864724218986Ad4a3a'
    const amount = '2.5'

    await expect(
      fetchBestTrade(chainId, inputToken, outputToken, amount, {
        poolTypes: [PoolType.V2, PoolType.V3_100, PoolType.V3_500, PoolType.V3_3000, PoolType.V3_10000],
      }).then(async (trade) => {
        console.log(trade)
        useFixture(serialization(trade), __filename, 'testnet-trade.json', true)

        const txRequest = prepareTradeTxRequest(chainId, trade, walletAddress)
        console.log(txRequest)
        return txRequest
      }),
    ).resolves.toBeDefined()

    useFixture(serialization(spiedEncodeSmartRouterFunctionData.mock.calls), __filename, 'testnet-calls.json', true)
  }, 0)
})
