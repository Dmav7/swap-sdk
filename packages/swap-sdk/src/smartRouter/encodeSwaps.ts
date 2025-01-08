import type { TradeType } from "../types";
import { encodeV2Swaps } from "./encodeV2Swaps";
import { encodeSingleHopV3Swap, encodeV3Swaps } from "./encodeV3Swaps";
import { partitionRouteByProtocol } from "./partitionRouteByProtocol";
import type { EncodableTradeRoute, EncodeTradeOptions } from "./types";

export function encodeSwaps(
  route: EncodableTradeRoute,
  tradeType: TradeType,
  outputCustodyDuringTx: boolean,
  options: EncodeTradeOptions,
): string[] {
  const partitionedRoutes = partitionRouteByProtocol(route);

  return partitionedRoutes.map((partitionedRoute, i) => {
    const partitionOutputCustodyDuringTx =
      i !== partitionedRoutes.length - 1 || outputCustodyDuringTx;
    if (partitionedRoute.pool.every((p) => p.version.startsWith("V3_"))) {
      if (partitionedRoute.pool.length === 1) {
        return encodeSingleHopV3Swap(
          partitionedRoute,
          tradeType,
          partitionOutputCustodyDuringTx,
          options,
        );
      } else {
        return encodeV3Swaps(
          partitionedRoute,
          tradeType,
          partitionOutputCustodyDuringTx,
          options,
        );
      }
    }

    if (partitionedRoute.pool.every((p) => p.version === "V2")) {
      return encodeV2Swaps(
        partitionedRoute,
        tradeType,
        partitionOutputCustodyDuringTx,
        options,
      );
    }

    throw new Error("encodeSwaps: unknown pool.version");
  });
}
