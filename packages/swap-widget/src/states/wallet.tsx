import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { BrowserProvider, JsonRpcSigner, TransactionRequest } from 'ethers'
import { BuiltInChainId } from '@vvs-finance/swap-sdk'
import { createCurrentWallet } from '@react-web3-wallet/react'
import { MetaMask } from '@react-web3-wallet/metamask'
import { DeFiWallet } from '@react-web3-wallet/defiwallet'
import { DEFAULT_CHAIN_ID, SELECTABLE_CHAIN_IDS } from '../config/chains'

interface WidgetWallet {
  ready: boolean
  supportedChainId: BuiltInChainId
  provider?: BrowserProvider
  chainId?: number
  signer?: JsonRpcSigner
  account?: string
  isExternal?: boolean
}

export interface ExternalProvider {
  getSigner: () => Promise<ExternalSigner>
  getNetwork: () => Promise<any>
}
export interface ExternalSigner {
  sendTransaction: (tx: TransactionRequest) => any
  address: string
}

const widgetSelfWallet = createCurrentWallet([new MetaMask(), new DeFiWallet()])

const INIT_WIDGET_WALLET: WidgetWallet = {
  ready: false,
  supportedChainId: DEFAULT_CHAIN_ID,
  provider: undefined,
  chainId: undefined,
  signer: undefined,
  account: undefined,
  isExternal: undefined,
}

const WidgetWalletContext = createContext<WidgetWallet>(INIT_WIDGET_WALLET)

interface WidgetWalletProviderProps {
  children: ReactNode
  isProviderExternal: boolean
  externalProvider?: ExternalProvider
}

export function WidgetWalletProvider({ children, isProviderExternal, externalProvider }: WidgetWalletProviderProps) {
  const [wallet, setWallet] = useState<WidgetWallet>(INIT_WIDGET_WALLET)
  const widgetSelfProvider = widgetSelfWallet.useProvider()
  const widgetSelfAccount = widgetSelfWallet.useAccount()

  useEffect(() => {
    const provider = (isProviderExternal ? externalProvider : widgetSelfProvider) as unknown as BrowserProvider

    if (provider && (isProviderExternal || widgetSelfAccount)) {
      Promise.all([provider.getSigner(), provider.getNetwork()] as const).then(([signer, network]) => {
        const chainId = Number(network.chainId)
        const supportedChainId = SELECTABLE_CHAIN_IDS.includes(chainId) ? chainId : DEFAULT_CHAIN_ID
        const ready = supportedChainId === chainId && !!signer?.address

        setWallet({
          ready,
          supportedChainId,
          provider,
          chainId: Number(network.chainId),
          signer,
          account: signer.address,
          isExternal: isProviderExternal,
        })
      })
    } else {
      setWallet(INIT_WIDGET_WALLET)
    }
  }, [isProviderExternal, externalProvider, widgetSelfProvider, widgetSelfAccount])

  return <WidgetWalletContext.Provider value={wallet}>{children}</WidgetWalletContext.Provider>
}

export function useWidgetWallet() {
  const context = useContext(WidgetWalletContext)
  if (context === undefined) {
    throw new Error('useWidgetWallet must be used within a WidgetWalletProvider')
  }
  return context
}

export const connectAsWidgetSelfWallet = widgetSelfWallet.connectAsCurrentWallet
export const disconnectWidgetSelfWallet = widgetSelfWallet.disconnect
export const watchAsset = widgetSelfWallet.watchAsset
