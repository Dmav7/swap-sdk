import { Button } from '../Button'

import { WALLET_CONFIGS } from '../../config/wallets'
import { connectAsWidgetSelfWallet } from '../../states/wallet'
import Modal from '../Modal'
import { DEFAULT_CHAIN_ID } from '../../config/chains'
import { BuiltInChainId } from '@vvs-finance/swap-sdk'

export interface WalletConnectModalProps {
  isOpen: boolean
  onClose: VoidFunction
  selfConnectingChainId?: BuiltInChainId
}

function WalletConnectModal({ isOpen, onClose, selfConnectingChainId }: WalletConnectModalProps) {
  return (
    <Modal title="Connect Wallet" isOpen={isOpen} onClose={onClose}>
      <div className="grid grid-cols-2 gap-6 mt-6">
        {WALLET_CONFIGS.map(({ name, Icon, label }) => (
          <div
            key={name}
            className="flex flex-col justify-center items-center gap-3 cursor-pointer"
            onClick={async () => {
              await connectAsWidgetSelfWallet(name, selfConnectingChainId ?? DEFAULT_CHAIN_ID)
              onClose()
            }}
          >
            <Icon />
            <div className="text-center">{label}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center mt-6 gap-3">
        <div className="font-normal text-base text-darkGray text-center">Haven’t got a crypto wallet yet?</div>

        <Button
          onClick={onClose}
          className="w-fit items-center gap-2 bg-primary p-3 rounded-xl text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none"
        >
          Learn How To Connect
        </Button>
      </div>
    </Modal>
  )
}

export default WalletConnectModal
