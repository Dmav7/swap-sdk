import { PoolType } from '@vvs-finance/swap-sdk'

import Modal from '../Modal'
import Checkbox from '../Checkbox'

import clsx from 'clsx'
import Switch from '@components/Switch'
import useSettings, {
  DEFAULT_GAS_PRESET,
  GasPricePreset,
  MULTI_HOP_ENABLED,
  POOL_TYPES_V3_DISABLED,
  POOL_TYPES_V3_ENABLED,
  SPLIT_ROUTING_ENABLED,
} from '@states/useSettings'
import Tooltips from '@components/Tooltips'

export interface SettingModalProps {
  isOpen: boolean
  onClose: VoidFunction
}

function SettingModal({ isOpen, onClose }: SettingModalProps) {
  const { slippageTolerance, deadline, txSpeed, maxHops, maxSplits, poolTypes, setValue } = useSettings()

  return (
    <Modal title="Settings" isOpen={isOpen} onClose={onClose}>
      <div className="mt-6 text-darkGray text-sm">GENERAL</div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center mt-3">
          <span>Slippage Tolerance</span>{' '}
          <Tooltips tooltips="Slippage settings adjusts the acceptable % difference between quoted and executed prices. High tolerance can help transactions succeed, but you may get a less favourable price. Use with caution!" />
        </div>
      </div>

      <div className="flex gap-3 mt-2">
        {[0.1, 0.5, 1].map((value) => (
          <span
            key={value}
            className={clsx(
              'min-w-[52px] content-center text-center py-[9px] px-3 rounded-full font-bold text-sm cursor-pointer',
              slippageTolerance === value ? 'text-white bg-primary' : 'text-primary bg-primaryLight',
            )}
            onClick={() => setValue('slippageTolerance', value)}
          >
            {value.toFixed(1)}%
          </span>
        ))}

        <div className="flex items-center gap-[6px]">
          <input
            type="number"
            className="max-w-[70px] py-[9px] px-3 rounded-full text-center border-primaryBlack border-[1px] focus:outline-primary no-spinner bg-white"
            onChange={(e) => setValue('slippageTolerance', parseFloat(e.target.value))}
          />{' '}
          <span className="text-primary font-bold">%</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center">
          <span>Tx deadline (mins)</span>
          <Tooltips tooltips="Your transaction will revert if it is left confirming for longer than this time." />
        </div>
        <input
          type="number"
          value={deadline / 60}
          onChange={(e) => setValue('deadline', parseFloat(e.target.value) * 60)}
          className="max-w-[70px] py-[9px] px-3 rounded-full text-center border-primaryBlack border-[1px] focus:outline-primary no-spinner bg-white"
        />
      </div>

      <div className="flex flex-col gap-2 mt-3">
        <div className="flex items-center">
          <span>Default Transaction Speed (GWEI)</span>
          <Tooltips tooltips="Adjusts the default gas price (transaction fee) for your transaction. Currently, Cronos operates at a fixed gas fee. Changing this value or the gas fee settings in your crypto wallet will not affect speed." />
        </div>

        <div className="flex flex-wrap gap-2">
          {Object.values(GasPricePreset).map((value) => {
            const gasWei = DEFAULT_GAS_PRESET?.[value]

            return (
              <span
                key={value}
                className={clsx(
                  'min-w-[52px] content-center text-center py-[9px] px-3 rounded-full font-bold text-sm cursor-pointer',
                  txSpeed === gasWei ? 'text-white bg-primary' : 'text-primary bg-primaryLight',
                )}
                onClick={() => setValue('txSpeed', gasWei)}
              >
                {value}
                {gasWei ? `(${gasWei / 1000000000})` : ''}
              </span>
            )
          })}
        </div>
      </div>

      <div className="border-t border-primaryLight w-full my-6" />

      <div className="mt-6 text-darkGray text-sm">LIQUIDITY SOURCE</div>

      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center">
          <span>VVS Swap v3</span>
          <Tooltips tooltips="V3 offers flawless liquidity to provide deeper liquidity for traders with the same amount of capital, offering lower slippage and more flexible trading fee tiers." />
        </div>

        <Switch
          enabled={poolTypes.includes(PoolType.V3_100)}
          setEnabled={(enabled) => setValue('poolTypes', enabled ? POOL_TYPES_V3_ENABLED : POOL_TYPES_V3_DISABLED)}
        />
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center">
          <span>VVS Swap v2</span>
          <Tooltips tooltips="The previous V2 exchange is where a number of iconic, popular assets are traded. Recommend leaving this on to ensure backward compatibility." />
        </div>

        <Switch enabled disabled />
      </div>

      <div className="border-t border-primaryLight w-full my-6" />

      <div className="mt-6 text-darkGray text-sm">ROUTING PREFERENCE</div>

      <div className="flex gap-[6px] items-center mt-3">
        <Checkbox
          enabled={maxHops === MULTI_HOP_ENABLED}
          onClick={(enabled) => setValue('maxHops', enabled ? MULTI_HOP_ENABLED : 1)}
        />
        <span>Allow Multihops</span>
        <Tooltips
          tooltips={
            <div className="flex flex-col gap-2">
              <span>
                Multihops enables token swaps through multiple hops between serval pools to achieve the best deal.
              </span>
              <span>
                Turning this off will only allow direct swap, which may cause higher slippage or even fund loss.
              </span>
            </div>
          }
        />
      </div>

      <div className="flex gap-[6px] items-center mt-3">
        <Checkbox
          enabled={maxSplits === SPLIT_ROUTING_ENABLED}
          onClick={(enabled) => setValue('maxSplits', enabled ? SPLIT_ROUTING_ENABLED : 1)}
        />
        <span>Allow Split Rounting</span>
        <Tooltips
          tooltips={
            <div className="flex flex-col gap-2">
              <span>Split routing enables token swaps to be broken into multiple routes to achieve the best deal.</span>
              <span>
                Turning this off will only allow a single route, which may result in low efficiency or higher slippage.
              </span>
            </div>
          }
        />
      </div>
    </Modal>
  )
}

export default SettingModal
