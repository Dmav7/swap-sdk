import fetch from "node-fetch";

import { QUOTE_API_ENDPOINT_BY_CHAIN } from "../config/quoteApi";
import { SupportedChainId } from "../types";
import { PoolType, TradeType } from "../types/base";
import type { BestAMMTradeOpts } from "../types/trade";
import {
  NetworkUnsupportedError,
  NoQuoteApiEndpointError,
  PoolUnsupportedError,
  ServerChainUnsupportedError,
  ServerInsufficientLiquidityError,
  ServerOtherError,
  ServerPoolUnsupportedError,
  ServerTokenUnsupportedError,
  TradeTypeUnsupportedError,
} from "./errors";
import type { TradeQuoteData } from "./types";

const API_CHAIN_NAMES: Record<SupportedChainId, string> = {
  [SupportedChainId.CRONOS_MAINNET]: "CRONOS",
  [SupportedChainId.CRONOS_TESTNET]: "CRONOS",
};

const API_TRADE_TYPES: Record<TradeType, string> = {
  [TradeType.EXACT_INPUT]: "EXACT_INPUT",
  [TradeType.EXACT_OUTPUT]: "EXACT_OUTPUT",
};

const API_POOL_TYPES: Record<PoolType, string> = {
  [PoolType.V2]: "V2",
  [PoolType.V3_100]: "V3_100",
  [PoolType.V3_500]: "V3_500",
  [PoolType.V3_3000]: "V3_3000",
  [PoolType.V3_10000]: "V3_10000",
};

type FetchQuoteApiArgs = {
  chainId: SupportedChainId;
  inputTokenAddress: string;
  outputTokenAddress: string;

  amount: string;
} & BestAMMTradeOpts;

interface TradeQuoteRes {
  code: number;
  data: TradeQuoteData;
  message: string;
}

export async function fetchQuoteApi(
  args: FetchQuoteApiArgs,
): Promise<TradeQuoteData> {
  const {
    chainId,
    inputTokenAddress,
    outputTokenAddress,
    amount,
    tradeType,
    maxHops,
    maxSplits,
    poolTypes,
    quoteApiEndpoint,
  } = args;
  const chainName = API_CHAIN_NAMES[chainId];
  if (!chainName) {
    throw new NetworkUnsupportedError(chainId);
  }

  const endpoint =
    quoteApiEndpoint ??
    QUOTE_API_ENDPOINT_BY_CHAIN[chainId] ??
    process.env[`QUOTE_API_ENDPOINT_${chainId}`];
  if (!endpoint) {
    throw new NoQuoteApiEndpointError(chainId);
  }

  const apiTradeType = API_TRADE_TYPES[tradeType];
  if (!apiTradeType) {
    throw new TradeTypeUnsupportedError(tradeType);
  }

  const apiPoolTypes = poolTypes.map((poolType) => API_POOL_TYPES[poolType]);
  if (apiPoolTypes.some((poolType) => !poolType)) {
    throw new PoolUnsupportedError(poolTypes);
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chain: chainName,
      currencyIn: inputTokenAddress,
      currencyOut: outputTokenAddress,
      amount,
      tradeType: apiTradeType,
      maxHops,
      maxSplits,
      poolTypes: apiPoolTypes,
    }),
  });

  const quoteRes = (await response.json()) as TradeQuoteRes;
  throwIfError(quoteRes, args);

  return quoteRes.data;
}

function throwIfError(quoteRes: TradeQuoteRes, args: FetchQuoteApiArgs) {
  if (quoteRes.code === 0 && quoteRes.data) return;

  switch (quoteRes.code) {
    case 40000:
      throw new ServerChainUnsupportedError(args.chainId);
    case 40001:
      throw new ServerPoolUnsupportedError(args.poolTypes);
    case 40002:
      throw new ServerTokenUnsupportedError(
        args.inputTokenAddress,
        args.outputTokenAddress,
      );
    case 40003:
      throw new ServerInsufficientLiquidityError();
    default:
      throw new ServerOtherError(quoteRes.message);
  }
}
