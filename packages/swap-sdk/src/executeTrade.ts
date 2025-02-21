import type { Signer, TransactionRequest } from "ethers";

import { getContractAddress } from "./config";
import { encodeTrade } from "./smartRouter/encodeTrade";
import type { EncodeArgs } from "./smartRouter/types";
import type { SupportedChainId, Trade } from "./types";

export type TradeTxOptions = Omit<EncodeArgs, "recipient"> & {
  routerAddress?: string;
};
export type ExecuteTradeOptions = TradeTxOptions & {
  recipient?: string;
};

export async function executeTrade(
  chainId: SupportedChainId,
  trade: Trade,
  signer: Signer,
  options: ExecuteTradeOptions = {},
) {
  const recipient = options.recipient ?? (await signer.getAddress());
  return signer.sendTransaction(
    prepareTradeTxRequest(chainId, trade, recipient, options),
  );
}

export function prepareTradeTxRequest(
  chainId: SupportedChainId,
  trade: Trade,
  recipient: string,
  options: TradeTxOptions = {},
): TransactionRequest {
  const routerAddress =
    options.routerAddress ?? getContractAddress(chainId, "SmartRouter");
  if (!routerAddress) throw new Error("No router address found for chain");

  const { value, calldata } = encodeTrade(trade, {
    recipient,
    ...options,
  });
  return {
    to: routerAddress,
    data: calldata,
    value,
  };
}
