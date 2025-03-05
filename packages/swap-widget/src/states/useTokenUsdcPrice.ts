import useSWR from 'swr/immutable'
import { NATIVE_TOKEN_ID } from '@vvs-finance/swap-sdk'
import { BUILT_IN_TOKENS } from '@config/tokens'
import { useWidgetWallet } from '@states/wallet'

import { QUERY_KEYS, TOKEN_ENDPOINT_MAPPING } from '../consts'

export const useAdapterNativeToken = (address: string): string => {
  const { supportedChainId } = useWidgetWallet()
  const wrapperTokenAddress = BUILT_IN_TOKENS[supportedChainId].find((token) => token.symbol === 'WCRO')?.address ?? ''

  if (address === NATIVE_TOKEN_ID) return wrapperTokenAddress

  return address
}

const useTokenUsdcPrice = (addresses: string[]) => {
  const { supportedChainId } = useWidgetWallet()
  const endpoint = TOKEN_ENDPOINT_MAPPING[supportedChainId]

  return useSWR(addresses && endpoint && [QUERY_KEYS.TOKEN_PRICE, addresses], async (): Promise<Null<number>[]> => {
    if (!addresses.length || !endpoint) return [null, null]

    const res = await Promise.all(
      addresses.map(async (address) => {
        if (!address) return null

        const price = await fetch(`${endpoint}/${address}/price`).then((res) => res.json())

        return parseFloat(price.data.priceUSD) ?? null
      }),
    )

    return res
  })
}

export default useTokenUsdcPrice
