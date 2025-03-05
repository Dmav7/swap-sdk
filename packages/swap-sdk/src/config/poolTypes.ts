import { PoolType } from '../types/base'

export const LP_FEE_RATIOS = {
  [PoolType.V2]: 0.003,
  [PoolType.V3_100]: 0.0001,
  [PoolType.V3_500]: 0.0005,
  [PoolType.V3_3000]: 0.003,
  [PoolType.V3_10000]: 0.01,
} as const
