import React, { useState } from 'react'
import { TokenConfig } from '@config/tokens'
import UnknownTokenLogo from '@icons/Tokens/Unknown.svg?react'

export const TokenLogo = React.memo(function TokenLogo({
  tokenConfig,
  size = 32,
}: {
  tokenConfig: Undefined<TokenConfig>
  size?: number
}) {
  const LogoComponent = tokenConfig?.logoComponent
  if (LogoComponent) {
    return <LogoComponent width={size} height={size} />
  }

  return <TokenLogoImg src={tokenConfig?.logoURI} size={size} />
})

function TokenLogoImg({ src, size }: { src?: string; size: number }) {
  const [error, setError] = useState(() => !src)
  if (error) {
    return <UnknownTokenLogo width={size} height={size} />
  }

  return <img src={src} onError={() => setError(true)} />
}
