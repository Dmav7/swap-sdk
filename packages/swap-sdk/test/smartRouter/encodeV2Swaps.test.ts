import { TradeType } from '../../src'
import { encodeV2Swaps } from '../../src/smartRouter/encodeV2Swaps'
import { usdcToVvsV2TradeRoute, vvsToUsdcV2ExactOutputTradeRoute } from '../fixtures/trades'
import * as helpers from '../helpers'

// helpers.setRecording(true);

describe('encodeV2Swap', () => {
  it('encodes simple usdc to vvs route', async () => {
    const route = usdcToVvsV2TradeRoute()
    const encoded = encodeV2Swaps(route, TradeType.EXACT_INPUT, false, {
      recipient: '0x0000000000000000000000000000000000000003',
    })

    expect(encoded).toBe(helpers.useFixture(encoded, __filename, 'encoded-simple-usdc-vvs.json'))
  })

  it('encodes vvs to exact output usdc route', async () => {
    const route = vvsToUsdcV2ExactOutputTradeRoute()
    const encoded = encodeV2Swaps(route, TradeType.EXACT_OUTPUT, false, {
      recipient: '0x0000000000000000000000000000000000000003',
    })

    expect(encoded).toBe(helpers.useFixture(encoded, __filename, 'encoded-vvs-usdc-exact-output.json'))
  })
})
