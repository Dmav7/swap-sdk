import type { TokenAmount } from '../types'

export function tokenAmountToWei(amount: TokenAmount) {
  return BigInt(amount.amount.shl(amount.decimals).toFixed(0))
}
