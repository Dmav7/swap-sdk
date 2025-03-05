import { Fraction } from 'bi-fraction'

import { tokenAmount } from '../quoteApi/parseTokenAmount'
import type { TokenInfo, TradeRoutePool } from '../types'
import { reduceRoutePath } from '../utils/mapReduceRoutePath'
import type { EncodableTradeRoute } from './types'

interface Partition {
  pools: TradeRoutePool[]
  tokenFrom: TokenInfo
  tokenTo: TokenInfo
}

export function partitionRouteByProtocol(route: EncodableTradeRoute) {
  const [partitions] = reduceRoutePath<[partitions: Partition[], lastPool?: TradeRoutePool]>(
    route,
    ([partitioning, lastPool], step, pool) => {
      const concludedPartitions = partitioning.slice(0, -1)
      const currentPartition = partitioning.at(-1)
      if (
        lastPool === undefined ||
        // pool and lastPool are both V2 or both V3:
        (pool.version.startsWith('V3_') && lastPool.version.startsWith('V3_')) ||
        (pool.version === 'V2' && lastPool.version === 'V2')
      ) {
        // add pool to currentPartition:
        return [
          [
            ...concludedPartitions,
            {
              pools: [...(currentPartition?.pools || []), pool],
              tokenFrom: currentPartition ? currentPartition.tokenFrom : step.tokenFrom,
              tokenTo: step.tokenTo,
            },
          ],
          pool,
        ]
      } else {
        if (currentPartition === undefined) {
          throw new Error('partitionRouteByProtocol: unexpected route')
        }
        // create new partition
        return [
          [
            ...concludedPartitions,
            currentPartition,
            {
              pools: [pool],
              tokenFrom: step.tokenFrom,
              tokenTo: step.tokenTo,
            },
          ],
          pool,
        ]
      }
    },
    [[]],
  )

  return partitions.map<EncodableTradeRoute>((partition, i) => {
    const isFirst = i === 0
    const isLast = i === partitions.length - 1
    return {
      amountIn: isFirst ? route.amountIn : tokenAmount(Fraction.ZERO, partition.tokenFrom),
      amountOut: isLast ? route.amountOut : tokenAmount(Fraction.ZERO, partition.tokenTo),

      pool: partition.pools,
      slippage:
        route.slippage &&
        (route.slippage.type === 'minimumReceived'
          ? isLast
            ? route.slippage
            : undefined
          : isFirst
            ? route.slippage
            : undefined),
    }
  })
}
