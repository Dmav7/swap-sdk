import { ExternalProvider, WidgetWalletProvider } from './states/wallet'

import swapWidgetCss from './index.css?inline'
import { ShadowRoot } from '@components/ShadowRoot'
import { SwapWidgetComponent, SwapWidgetComponentProps } from '@components/SwapWidget'

interface SwapWidgetProps extends SwapWidgetComponentProps {
  /**
    SwapWidget internal wallet will be disabled when `provider` or `onRequestWalletConnection` props is defined
  */
  provider?: ExternalProvider
  shadowRootMode?: ShadowRootMode
  css?: string
}

export function SwapWidget({ shadowRootMode = 'open', css, provider, ...props }: SwapWidgetProps) {
  const isProviderExternal = !!props.onRequestWalletConnection || !!provider

  return (
    <WidgetWalletProvider isProviderExternal={isProviderExternal} externalProvider={provider}>
      <ShadowRoot mode={shadowRootMode}>
        <style>{swapWidgetCss}</style>
        {css && <style>{css}</style>}
        <SwapWidgetComponent {...props} />
      </ShadowRoot>
    </WidgetWalletProvider>
  )
}

export type { TokenConfig } from '@config/tokens'

export { BuiltInChainId } from '@vvs-finance/swap-sdk'
