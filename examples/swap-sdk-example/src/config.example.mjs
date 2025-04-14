import * as viemChains from 'viem/chains'

export const walletPrivateKey = '' // string exported from metamask

export const chain = viemChains.cronosTestnet
export const inputToken = '0x904Bd5a5AAC0B9d88A0D47864724218986Ad4a3a' // VVS
export const outputToken = 'NATIVE'
export const amount = '2.5'
export const quoteApiClientId = process.env.SWAP_SDK_QUOTE_API_CLIENT_ID_338

// export const chain = viemChains.cronos
// export const inputToken = "NATIVE";
// export const outputToken = "0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03"; // VVS
// export const amount = "2.5"
// export const quoteApiClientId = process.env.SWAP_SDK_QUOTE_API_CLIENT_ID_25
