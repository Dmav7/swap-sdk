import { Trade } from '@vvs-finance/swap-sdk'
import { Fraction } from 'bi-fraction'

const computePriceImpact = (trade: Undefined<Trade>, prices: Null<number>[]): Fraction => {
  if (!trade) return Fraction.ZERO

  const [inputTokenPrice, outputTokenPrice] = prices

  const expectedPrice = outputTokenPrice && inputTokenPrice ? new Fraction(inputTokenPrice).div(outputTokenPrice) : 0

  const expectedOutputAmount = trade.amountIn.amount.sub(trade.lpFee.amount).mul(expectedPrice)

  const actualOutputAmount = trade.amountOut.amount

  const priceImpact = expectedOutputAmount
    .div(actualOutputAmount || 1)
    .sub(1)
    .mul(100)

  return priceImpact
}

export default computePriceImpact
