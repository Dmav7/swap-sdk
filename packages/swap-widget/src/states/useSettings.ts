import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PoolType } from '@vvs-finance/swap-sdk'

export enum GasPricePreset {
  WALLET = 'Wallet',
  STANDARD = 'Standard',
  FAST = 'Fast',
  INSTANT = 'Instant',
}

const DEFAULT_PRICE_WEI = 5100000000000
// NOTE: 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

export const DEFAULT_GAS_PRESET: Record<GasPricePreset, Undefined<number>> = {
  [GasPricePreset.WALLET]: undefined, // let wallet decide
  [GasPricePreset.STANDARD]: 1 * DEFAULT_PRICE_WEI,
  [GasPricePreset.FAST]: 1.1 * DEFAULT_PRICE_WEI,
  [GasPricePreset.INSTANT]: 1.2 * DEFAULT_PRICE_WEI,
}

export interface userSettings {
  slippageTolerance: number
  deadline: number
  txSpeed: Undefined<number>
  /**
    default 1, up to 3
  */
  maxHops: number
  /**
    default 1, up to 2
  */
  maxSplits: number
  poolTypes: PoolType[]
  setValue: (key: keyof userSettings, value: Undefined<number> | PoolType[]) => void
}

export const MULTI_HOP_ENABLED = 3
export const SPLIT_ROUTING_ENABLED = 2
export const POOL_TYPES_V3_ENABLED = [
  PoolType.V2,
  PoolType.V3_100,
  PoolType.V3_10000,
  PoolType.V3_3000,
  PoolType.V3_500,
]
export const POOL_TYPES_V3_DISABLED = [PoolType.V2]

const useSettings = create<userSettings>()(
  persist(
    (set) => ({
      slippageTolerance: 0.5,
      deadline: DEFAULT_DEADLINE_FROM_NOW,
      txSpeed: DEFAULT_PRICE_WEI,
      maxHops: MULTI_HOP_ENABLED,
      maxSplits: SPLIT_ROUTING_ENABLED,
      poolTypes: POOL_TYPES_V3_ENABLED,
      setValue: (key: keyof userSettings, value: Undefined<number> | PoolType[]) =>
        set((state) => ({ ...state, [key]: value })),
    }),
    {
      name: 'userSettings',
    },
  ),
)

export default useSettings
