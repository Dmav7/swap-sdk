import { Interface } from 'ethers'

import { SmartRouter as SwapRouterABI } from '../abis'
import type { SmartRouter } from '../types'

const SmartRouterInterface = new Interface(SwapRouterABI)

export const encodeSmartRouterFunctionData: SmartRouter['interface']['encodeFunctionData'] = (
  functionFragment,
  args,
) => {
  return SmartRouterInterface.encodeFunctionData(functionFragment, args)
}
