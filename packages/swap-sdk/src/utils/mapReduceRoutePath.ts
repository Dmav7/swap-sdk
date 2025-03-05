import type { Fraction } from 'bi-fraction'

import type { TokenInfo, TradeRoute, TradeRoutePool } from '../types'
import { isSameAddr } from '../utils/isSameAddr'

export interface PathStep {
  tokenFrom: TokenInfo
  tokenTo: TokenInfo
  tokenFromPrice: Fraction
  tokenToPrice: Fraction
}
type ReduceableTradeRoute = Pick<TradeRoute, 'amountIn' | 'pool'>

export function reduceRoutePath<T>(
  route: ReduceableTradeRoute,
  callback: (acc: T, step: PathStep, pool: TradeRoutePool) => T,
  initValue: T,
) {
  return route.pool.reduce<[string, T]>(
    ([currentTokenAddr, acc], p) => {
      const isToken0Current = isSameAddr(p.token0.address, currentTokenAddr)
      const step: PathStep = {
        tokenFrom: isToken0Current ? p.token0 : p.token1,
        tokenTo: isToken0Current ? p.token1 : p.token0,
        tokenFromPrice: isToken0Current ? p.token0Price : p.token1Price,
        tokenToPrice: isToken0Current ? p.token1Price : p.token0Price,
      }
      const nextToken = isSameAddr(p.token0.address, currentTokenAddr) ? p.token1.address : p.token0.address
      return [nextToken, callback(acc, step, p)]
    },
    [route.amountIn.address, initValue],
  )[1]
}

export function mapRoutePath<T>(
  route: ReduceableTradeRoute,
  callback: (
    step: {
      tokenFrom: TokenInfo
      tokenTo: TokenInfo
      tokenFromPrice: Fraction
      tokenToPrice: Fraction
    },
    pool: TradeRoutePool,
  ) => T,
) {
  return reduceRoutePath<T[]>(
    route,
    (acc, step, pool) => {
      return [...acc, callback(step, pool)]
    },
    [],
  )
}

export function routePath(route: ReduceableTradeRoute) {
  return [route.amountIn.address, ...mapRoutePath(route, ({ tokenTo }) => tokenTo.address)]
}
