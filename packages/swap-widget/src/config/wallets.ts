import { MetaMask } from '@react-web3-wallet/metamask'
import { DeFiWallet } from '@react-web3-wallet/defiwallet'
import { CryptocomDesktopWallet } from '@react-web3-wallet/cryptocom-desktop-wallet'
import { BraveWallet } from '@react-web3-wallet/brave-wallet'
import { BitgetWallet } from '@react-web3-wallet/bitget-wallet'
import { type WalletName } from '@react-web3-wallet/react'

import MetaMaskIcon from '@icons/Metamask.svg?react'
import CryptocomIcon from '@icons/Cryptocom.svg?react'
import CryptocomDesktopIcon from '@icons/CryptocomDesktop.svg?react'
import BraveWalletIcon from '@icons/BraveWallet.svg?react'
import BitgetWalletIcon from '@icons/BitgetWallet.svg?react'

export interface WalletConfig {
  // wallet name is the unique id of the wallet
  name: WalletName
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  label: string
}
export const WALLET_CONFIGS: WalletConfig[] = [
  {
    name: MetaMask.walletName,
    Icon: MetaMaskIcon,
    label: 'MetaMask',
  },
  {
    name: DeFiWallet.walletName,
    Icon: CryptocomIcon,
    label: 'Crypto.com Onchain',
  },
  {
    name: CryptocomDesktopWallet.walletName,
    Icon: CryptocomDesktopIcon,
    label: 'Crypto.com Onchain Wallet Desktop',
  },
  {
    name: BraveWallet.walletName,
    Icon: BraveWalletIcon,
    label: 'Brave Wallet',
  },
  {
    name: BitgetWallet.walletName,
    Icon: BitgetWalletIcon,
    label: 'Bitget Wallet',
  },
]
