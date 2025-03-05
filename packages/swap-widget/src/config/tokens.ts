import { BuiltInChainId } from '@vvs-finance/swap-sdk'
import CroLogo from '@icons/Tokens/CRO.svg?react'
import VvsLogo from '@icons/Tokens/VVS.svg?react'
import EthLogo from '@icons/Tokens/ETH.svg?react'
import UsdcLogo from '@icons/Tokens/USDC.svg?react'
import CorgiaiLogo from '@icons/Tokens/CORGIAI.svg?react'
import FulLogo from '@icons/Tokens/FUL.svg?react'

export interface TokenConfig {
  name: string
  symbol: string
  address: string
  chainId: BuiltInChainId
  decimals: number
  logoURI?: string
  logoComponent?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

export const BUILT_IN_TOKENS: Record<BuiltInChainId, TokenConfig[]> = {
  [BuiltInChainId.CRONOS_MAINNET]: [
    {
      name: 'CRO Token',
      symbol: 'CRO',
      address: 'NATIVE',
      chainId: BuiltInChainId.CRONOS_MAINNET,
      decimals: 18,
      logoComponent: CroLogo,
    },
    {
      name: 'Wrapped CRO',
      symbol: 'WCRO',
      address: '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
      chainId: BuiltInChainId.CRONOS_MAINNET,
      decimals: 18,
      logoComponent: CroLogo,
    },
    {
      name: 'VVS',
      symbol: 'VVS',
      address: '0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03',
      chainId: BuiltInChainId.CRONOS_MAINNET,
      decimals: 18,
      logoComponent: VvsLogo,
    },
    {
      name: 'Wrapped Ether',
      symbol: 'ETH',
      address: '0xe44Fd7fCb2b1581822D0c862B68222998a0c299a',
      chainId: BuiltInChainId.CRONOS_MAINNET,
      decimals: 18,
      logoComponent: EthLogo,
    },
    {
      name: 'USD Coin',
      symbol: 'USDC',
      address: '0xc21223249CA28397B4B6541dfFaEcC539BfF0c59',
      chainId: BuiltInChainId.CRONOS_MAINNET,
      decimals: 6,
      logoComponent: UsdcLogo,
    },
    {
      name: 'CorgiAI',
      symbol: 'CORGIAI',
      address: '0x6b431B8a964BFcf28191b07c91189fF4403957D0',
      chainId: BuiltInChainId.CRONOS_MAINNET,
      decimals: 18,
      logoComponent: CorgiaiLogo,
    },
    {
      name: 'Fulcrom',
      symbol: 'FUL',
      address: '0x83aFB1C32E5637ACd0a452D87c3249f4a9F0013A',
      chainId: BuiltInChainId.CRONOS_MAINNET,
      decimals: 18,
      logoComponent: FulLogo,
    },
  ],
  [BuiltInChainId.CRONOS_TESTNET]: [
    {
      name: 'CRO Token',
      symbol: 'CRO',
      address: 'NATIVE',
      chainId: BuiltInChainId.CRONOS_TESTNET,
      decimals: 18,
      logoComponent: CroLogo,
    },
    {
      name: 'Wrapped CRO',
      symbol: 'WCRO',
      address: '0x6a3173618859C7cd40fAF6921b5E9eB6A76f1fD4',
      chainId: BuiltInChainId.CRONOS_TESTNET,
      decimals: 18,
      logoComponent: CroLogo,
    },
    {
      name: 'VVS',
      symbol: 'VVS',
      address: '0x904Bd5a5AAC0B9d88A0D47864724218986Ad4a3a',
      chainId: BuiltInChainId.CRONOS_TESTNET,
      decimals: 18,
      logoComponent: VvsLogo,
    },
    {
      name: 'Wrapped Ether',
      symbol: 'ETH',
      address: '0x441d72d584b16105FF1C68DC8bc4517F4DC13E55',
      chainId: BuiltInChainId.CRONOS_TESTNET,
      decimals: 18,
      logoComponent: EthLogo,
    },
    {
      name: 'USD Coin',
      symbol: 'USDC',
      address: '0x321106E51b78E0E9CEBcFeC63C5250F0F3CcB82b',
      chainId: BuiltInChainId.CRONOS_TESTNET,
      decimals: 6,
      logoComponent: UsdcLogo,
    },
    {
      name: 'CorgiAI',
      symbol: 'CORGIAI',
      address: '0x253997e20b9a25b32bed82bc7a2ae1d878ab6c8e',
      chainId: BuiltInChainId.CRONOS_TESTNET,
      decimals: 18,
      logoComponent: CorgiaiLogo,
    },
    {
      name: 'Fulcrom',
      symbol: 'FUL',
      address: '0x2e755Bf30938B64281900d2219C3842d509e9D92',
      chainId: BuiltInChainId.CRONOS_TESTNET,
      decimals: 18,
      logoComponent: FulLogo,
    },
  ],
}
