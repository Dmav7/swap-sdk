import { Input } from '@headlessui/react'

import Link from '@icons/Link.svg?react'
import { TokenLogo } from '@components/TokenLogo'
import { BUILT_IN_TOKENS, TokenConfig } from '@config/tokens'
import { useWidgetWallet } from '@states/wallet'
import { addressAbbr } from '@utils/address'
import { useTokenBalance } from '@states/balance'
import useChainProviderOptions from '@hooks/useChainProviderOptions'

import Modal from '../Modal'

export interface SelectTokenModalProps {
  isOpen: boolean
  onClose: VoidFunction
  onTokenSelect: (tokenConfig: TokenConfig) => void
  tokens?: TokenConfig[]
}

function SelectTokenModal({ isOpen, onClose, onTokenSelect, tokens }: SelectTokenModalProps) {
  const { supportedChainId } = useWidgetWallet()

  return (
    <Modal title="Select a token" isOpen={isOpen} onClose={onClose}>
      <Input
        className="w-full border-solid border-[1px] border-darkGray rounded-[50px] py-3 px-[18px] mt-6 focus:outline-primary bg-white"
        placeholder="Search by name or address"
      />

      <div className="flex flex-col gap-6 mt-6">
        {(tokens || BUILT_IN_TOKENS[supportedChainId]).map((tokenConfig) => {
          return (
            <TokenListItem
              key={tokenConfig.address}
              tokenConfig={tokenConfig}
              onClick={() => {
                onTokenSelect(tokenConfig)
                onClose()
              }}
            />
          )
        })}
      </div>
    </Modal>
  )
}

export default SelectTokenModal

function TokenListItem({ tokenConfig, onClick }: { tokenConfig: TokenConfig; onClick: VoidFunction }) {
  const balance = useTokenBalance(tokenConfig.address)
  const { chainExplorerBaseUrl } = useChainProviderOptions()

  return (
    <div className="flex justify-between items-center cursor-pointer" onClick={onClick}>
      <div className="flex flex-row justify-center gap-3 items-center">
        <TokenLogo tokenConfig={tokenConfig} size={32} />

        <div className="flex flex-col">
          <span className="flex items-center text-base text-black font-normal">
            <div>{tokenConfig.symbol}</div>
          </span>

          <div className="flex flex-row items-center gap-1 text-sm text-darkGray font-normal">
            <span>{tokenConfig.name}</span>
            {tokenConfig.address !== 'NATIVE' && (
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(`${chainExplorerBaseUrl}/token/${tokenConfig.address}`, '_blank')
                }}
                className="flex gap-1 px-1 py-[2px] rounded-[4px] bg-primaryLight"
              >
                <span>{addressAbbr(tokenConfig.address)}</span>
                <Link />
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        {balance.isLoading || !balance.data
          ? 'Loading'
          : balance.data.toFormat({
              decimalPlaces: 4,
              trailingZeros: false,
            })}
      </div>
    </div>
  )
}
