import { toHex } from '../utils/toHex'
import { encodeSmartRouterFunctionData } from './contractInterfaces'

export function encodeMulticall(calldatas: string[], deadlineOrPreviousBlockhash?: string | bigint) {
  if (deadlineOrPreviousBlockhash) {
    if (typeof deadlineOrPreviousBlockhash === 'string') {
      return encodeSmartRouterFunctionData('multicall(bytes32,bytes[])', [
        validateAndParseBytes32(deadlineOrPreviousBlockhash),
        calldatas,
      ])
    } else {
      return encodeSmartRouterFunctionData('multicall(uint256,bytes[])', [
        toHex(deadlineOrPreviousBlockhash),
        calldatas,
      ])
    }
  }
  return encodeSmartRouterFunctionData('multicall(bytes[])', [calldatas])
}

function validateAndParseBytes32(bytes32: string): string {
  if (!bytes32.match(/^0x[0-9a-fA-F]{64}$/)) {
    throw new Error(`${bytes32} is not valid bytes32.`)
  }

  return bytes32.toLowerCase()
}
