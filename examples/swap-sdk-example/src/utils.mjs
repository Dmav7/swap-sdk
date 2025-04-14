import { ethers } from 'ethers'
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

import * as config from './config.mjs'

export function print(...stuffs) {
  stuffs.forEach((stuff) => {
    const text = typeof stuff === 'string' ? stuff : jsonStr(stuff)
    console.log(text)

    if (typeof document === 'object') {
      const preTag = document.createElement('pre')
      preTag.textContent = text
      document.getElementById('app').appendChild(preTag)
    }
  })
}

export function jsonStr(obj) {
  return JSON.stringify(obj, (_key, value) => (typeof value === 'bigint' ? `${value.toString()}n` : value), 2)
}

export async function getEthersSigner() {
  if (config.walletPrivateKey) {
    const provider = new ethers.JsonRpcProvider(config.chain.rpcUrls.default.http[0])
    return new ethers.Wallet(config.walletPrivateKey, provider)
  }

  if (typeof window === 'object' && window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum, config.chain.id)
    return provider.getSigner()
  }

  throw new Error(
    'getEthersSigner: failed to create ethers signer, no walletPrivateKey in config.mjs nor windows.ethereum',
  )
}

export async function getViemClient() {
  if (config.walletPrivateKey) {
    return {
      public: createPublicClient({
        chain: config.chain,
        transport: http(),
      }),
      wallet: createWalletClient({
        chain: config.chain,
        transport: http(),
        account: privateKeyToAccount(`0x${config.walletPrivateKey}`),
      }),
    }
  }

  if (typeof window === 'object' && window.ethereum) {
    return {
      public: createPublicClient({
        chain: config.chain,
        transport: custom(window.ethereum),
      }),
      wallet: createWalletClient({
        chain: config.chain,
        transport: custom(window.ethereum),
        account: (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0],
      }),
    }
  }

  throw new Error(
    'getViemClient: failed to create viem clients, no walletPrivateKey in config.mjs nor windows.ethereum',
  )
}
