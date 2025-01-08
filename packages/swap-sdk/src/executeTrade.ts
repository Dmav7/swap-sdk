import { type Signer } from "ethers";

import { getContractAddress } from "./config";
import { encodeTrade } from "./smartRouter/encodeTrade";
import type { EncodeTradeOptions } from "./smartRouter/types";
import type { SupportedChainId, Trade } from "./types";

export type ExecuteTradeOptions = Omit<EncodeTradeOptions, "recipient"> & {
  recipient?: string;
  routerAddress?: string;
};

export async function executeTrade(
  chainId: SupportedChainId,
  trade: Trade,
  signer: Signer,
  options: ExecuteTradeOptions = {},
) {
  const routerAddress =
    options.routerAddress ?? getContractAddress(chainId, "SmartRouter");
  if (!routerAddress) throw new Error("No router address found for chain");

  const { value, calldata } = encodeTrade(trade, {
    recipient: await signer.getAddress(),
    ...options,
  });

  return signer.sendTransaction({
    to: routerAddress,
    data: calldata,
    value,
  });
}
