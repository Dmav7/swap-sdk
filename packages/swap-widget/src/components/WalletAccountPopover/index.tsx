import AccountIcon from '@icons/Account.svg?react'
import ChevronDownIcon from '@icons/ChevronDown.svg?react'
import DisconnectIcon from '@icons/Disconnect.svg?react'
import { Popover, PopoverButton, PopoverPanel } from '../Popover'
import { Button } from '@headlessui/react'

import { disconnectWidgetSelfWallet, useWidgetWallet } from '../../states/wallet'
import { addressAbbr } from '../../utils/address'

export function WalletAccountPopover() {
  const { account, isExternal } = useWidgetWallet()

  if (!account) return null

  return (
    <Popover className="relative">
      <PopoverButton className="flex items-center">
        <AccountIcon />

        <span className="text-xs font-bold ml-1 mr-2">{addressAbbr(account)}</span>

        <ChevronDownIcon />
      </PopoverButton>
      {!isExternal && (
        <PopoverPanel anchor="bottom" className="mt-2 bg-white border border-slate-300 rounded-lg py-1 px-2">
          <Button
            className="flex items-center text-sm font-semibold gap-5 p-2"
            onClick={() => {
              disconnectWidgetSelfWallet()
            }}
          >
            Disconnect
            <DisconnectIcon />
          </Button>
        </PopoverPanel>
      )}
    </Popover>
  )
}
