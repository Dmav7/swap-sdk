import { MetaMask } from '@react-web3-wallet/metamask'
import { createWallet } from '@react-web3-wallet/react'

import styles from './App.module.css'

import { BuiltInChainId, SwapWidget } from '../src'
import { useEffect, useState } from 'react'
import { TokenConfig } from '@config/tokens'

const metamask = createWallet(new MetaMask())

function App() {
  const [isHostControlEnabled, setIsHostControlEnabled] = useState(false)
  const [hostInputToken, setHostInputToken] = useState<TokenConfig>()
  const [hostOutputToken, setHostOutputToken] = useState<TokenConfig>()

  const provider = metamask.useProvider()
  const account = metamask.useAccount()
  const chainId = metamask.useChainId() as BuiltInChainId

  useEffect(() => {
    setHostInputToken(undefined)
    setHostOutputToken(undefined)
  }, [chainId])

  return (
    <>
      <div id={styles.swapWidgetContainer}>
        {isHostControlEnabled ? (
          <>
            <button
              onClick={() => {
                if (!account) {
                  metamask.connect()
                } else {
                  metamask.disconnect()
                }
              }}
            >
              {account
                ? `connected to ${account} (${chainId}), click here to disconnect`
                : 'Wallet not connected, click here to connect to metamask'}
            </button>

            {account && (
              <>
                <div>
                  Host inputToken:
                  <select
                    value={hostInputToken?.address ?? ''}
                    onChange={(e) => setHostInputToken(getHostToken(chainId, e.target.value))}
                  >
                    <HostTokenOptions />
                  </select>{' '}
                  outputToken:
                  <select
                    value={hostOutputToken?.address ?? ''}
                    onChange={(e) => setHostOutputToken(getHostToken(chainId, e.target.value))}
                  >
                    <HostTokenOptions />
                  </select>
                </div>
              </>
            )}
          </>
        ) : (
          <button onClick={() => setIsHostControlEnabled(true)}>Enable host (consumer of SwapWidget) control</button>
        )}

        <SwapWidget
          getQuoteApiClientId={(chainId) => import.meta.env[`VITE_SWAP_WIDGET_QUOTE_API_CLIENT_ID_${chainId}`]}
          provider={account ? provider : undefined}
          selfConnectingChainId={parseInt(import.meta.env.VITE_SELF_CONNECTING_CHAIN_ID ?? '338')}
          onRequestWalletConnection={isHostControlEnabled ? metamask.connect : undefined}
          inputToken={isHostControlEnabled ? hostInputToken : undefined}
          outputToken={isHostControlEnabled ? hostOutputToken : undefined}
          tokens={isHostControlEnabled ? HOST_TOKENS[chainId] : undefined}
        />
      </div>
    </>
  )
}

export default App

const HOST_TOKENS = {
  [BuiltInChainId.CRONOS_MAINNET]: [
    {
      name: 'CORGIAI',
      symbol: 'CORGIAI',
      address: '0x6b431B8a964BFcf28191b07c91189fF4403957D0',
      chainId: BuiltInChainId.CRONOS_MAINNET,
      decimals: 18,
    },
    {
      name: 'Liquid CRO',
      symbol: 'LCRO',
      address: '0x9Fae23A2700FEeCd5b93e43fDBc03c76AA7C08A6',
      chainId: BuiltInChainId.CRONOS_MAINNET,
      decimals: 18,
    },
  ],
  [BuiltInChainId.CRONOS_TESTNET]: [
    {
      name: 'START',
      symbol: 'START',
      address: '0x3cB52C062BcBDAa2E88Fbc7A21ACa7765FaA4c4c',
      chainId: BuiltInChainId.CRONOS_TESTNET,
      decimals: 18,
    },
    {
      name: 'ROSE',
      symbol: 'ROSE',
      address: '0x7eBDdF6c91E19283a3Ad708754ABAd7A6ad0E657',
      chainId: BuiltInChainId.CRONOS_TESTNET,
      decimals: 18,
    },
  ],
}

function HostTokenOptions() {
  const chainId = metamask.useChainId() as BuiltInChainId
  if (!HOST_TOKENS[chainId]) return null
  return (
    <>
      <option value="">Not assigned</option>
      {HOST_TOKENS[chainId].map((tokenConfig) => (
        <option key={tokenConfig.address} value={tokenConfig.address}>
          {tokenConfig.symbol}
        </option>
      ))}
    </>
  )
}

function getHostToken(chainId: BuiltInChainId, addr: string) {
  return HOST_TOKENS[chainId].find((t) => t.address === addr)
}
