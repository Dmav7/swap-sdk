export interface WatchAssetParameters {
  address: string
  symbol: string
  decimals: number
  image: string
}

const getWatchAssetParameters = (address: string, symbol: string, decimals: number): WatchAssetParameters => {
  return {
    address,
    symbol,
    decimals,
    image: `../icons/Tokens/${symbol}.svg`,
  }
}

export default getWatchAssetParameters
