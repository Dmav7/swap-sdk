import { BuiltInChainId, DEFAULT_FETCH_BEST_TRADE_OPTS, TradeType } from '../../src'
import { parseQuoteApiData } from '../../src/quoteApi/parseQuoteApiData'
import { exampleQuoteDataA, exampleQuoteDataB, mockTokenA, mockTokenC } from '../fixtures/quoteApiData'
import * as helpers from '../helpers'

describe('parseQuoteApiData', () => {
  it('should parse exact input trade correctly', () => {
    const result = parseQuoteApiData(BuiltInChainId.CRONOS_TESTNET, exampleQuoteDataA, false, false, {
      ...DEFAULT_FETCH_BEST_TRADE_OPTS,
      tradeType: TradeType.EXACT_INPUT,
      slippageTolerance: 0.005, // 0.5%
    })

    expect(helpers.serialization(result.amountIn.amount)).toEqual({
      denominator: '1',
      numerator: '1',
    })
    expect(helpers.serialization(result.amountOut.amount)).toEqual({
      denominator: '10',
      numerator: '19',
    })
    expect(result.routes).toHaveLength(1)
    expect(result.routes[0].percentage.toFixed(2)).toBe('1.00')
    expect(result.lpFeeRatio.toFixed(4)).toBe('0.0030')

    expect(result.slippage.type).toBe('minimumReceived')
    if (result.slippage.type !== 'minimumReceived') {
      throw new Error('Invalid slippage type') // for typescript
    }
    expect(helpers.serialization(result.slippage.minimumReceived.amount)).toEqual({
      denominator: '201',
      numerator: '380',
    })

    expect(result.routes[0].slippage.type).toBe('minimumReceived')
    if (result.routes[0].slippage.type !== 'minimumReceived') {
      throw new Error('Invalid slippage type') // for typescript
    }
    expect(helpers.serialization(result.routes[0].slippage.minimumReceived.amount)).toEqual({
      denominator: '201',
      numerator: '380',
    })
  })

  it('should output path of trade correctly', () => {
    const result = parseQuoteApiData(BuiltInChainId.CRONOS_TESTNET, exampleQuoteDataA, false, false, {
      ...DEFAULT_FETCH_BEST_TRADE_OPTS,
      tradeType: TradeType.EXACT_INPUT,
      slippageTolerance: 0.005, // 0.5%
    })

    expect(helpers.serialization(result.routes[0].path.length)).toBe(2)
    expect(helpers.serialization(result.routes[0].path[0].symbol)).toBe(mockTokenA.symbol)
    expect(helpers.serialization(result.routes[0].path[1].symbol)).toBe(mockTokenC.symbol)
  })

  it('should parse exact output trade correctly', () => {
    const result = parseQuoteApiData(BuiltInChainId.CRONOS_TESTNET, exampleQuoteDataB, false, false, {
      ...DEFAULT_FETCH_BEST_TRADE_OPTS,
      tradeType: TradeType.EXACT_OUTPUT,
      slippageTolerance: 0.01, // 1%
    })

    expect(helpers.serialization(result.amountIn.amount)).toEqual({
      denominator: '1',
      numerator: '1',
    })
    expect(helpers.serialization(result.amountOut.amount)).toEqual({
      denominator: '1',
      numerator: '2',
    })
    expect(result.routes).toHaveLength(2)
    expect(result.routes[0].percentage.toFixed(2)).toBe('0.50')
    expect(result.routes[1].percentage.toFixed(2)).toBe('0.50')
    expect(result.lpFeeRatio.toFixed(4)).toBe('0.0030') // Using V2 pool fee as reference
    expect(result.slippage.type).toBe('maximumSold')
    if (result.slippage.type !== 'maximumSold') {
      throw new Error('Invalid slippage type') // for typescript
    }
    expect(helpers.serialization(result.slippage.maximumSold.amount)).toEqual({
      denominator: '100',
      numerator: '101',
    })

    expect(result.routes[0].slippage.type).toBe('maximumSold')
    if (result.routes[0].slippage.type !== 'maximumSold') {
      throw new Error('Invalid slippage type') // for typescript
    }
    expect(helpers.serialization(result.routes[0].slippage.maximumSold.amount)).toEqual({
      denominator: '200',
      numerator: '101',
    })
  })
})
