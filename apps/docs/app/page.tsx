'use client'

import styles from './page.module.css'
import { BuiltInChainId, SwapWidget } from '@vvs-finance/swap-widget'

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SwapWidget
          getQuoteApiClientId={getClientIdFromEnv}
          selfConnectingChainId={parseInt(process.env.NEXT_PUBLIC_SELF_CONNECTING_CHAIN_ID ?? '338')}
        />
      </main>
    </div>
  )
}

function getClientIdFromEnv(chainId: BuiltInChainId): string {
  switch (chainId) {
    case BuiltInChainId.CRONOS_MAINNET:
      return process.env.NEXT_PUBLIC_SWAP_WIDGET_QUOTE_API_CLIENT_ID_25!
    case BuiltInChainId.CRONOS_TESTNET:
      return process.env.NEXT_PUBLIC_SWAP_WIDGET_QUOTE_API_CLIENT_ID_338!
  }
}
