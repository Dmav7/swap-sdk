import { SupportedChainId } from "../types";

export interface ContractAddressMap {
  SmartRouter: string;
}

export type ContractName = keyof ContractAddressMap;

const ADDRESS_BY_CHAIN: {
  [key in SupportedChainId]: ContractAddressMap;
} = {
  [SupportedChainId.CRONOS_MAINNET]: {
    SmartRouter: "0x66C0893E38B2a52E1Dc442b2dE75B802CcA49566",
  },
  [SupportedChainId.CRONOS_TESTNET]: {
    SmartRouter: "0xC74C960708f043E04a84038c6D1136EA7Fcb16a1",
  },
};

export const getContractAddress = (
  chainId: SupportedChainId,
  contractName: ContractName,
): string => {
  return ADDRESS_BY_CHAIN[chainId][contractName];
};
