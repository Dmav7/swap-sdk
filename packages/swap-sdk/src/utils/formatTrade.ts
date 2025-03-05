import { Trade } from '../types'

export function formatTrade(trade: Trade) {
  return `${trade.amountIn.amount.toFixed(5)} ${trade.amountIn.symbol} => ${trade.amountOut.amount.toFixed(5)} ${
    trade.amountOut.symbol
  } (${formatTradeRoutes(trade)})`
}
export function formatTradeRoutes(trade: Trade) {
  return trade.routes
    .map((r) => `${r.percentage.mul(100).toFixed()}%: ${r.path.map((p) => p.symbol).join(' -> ')}`)
    .join(', ')
}
