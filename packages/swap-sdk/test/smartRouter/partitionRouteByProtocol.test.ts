import { partitionRouteByProtocol } from "../../src/smartRouter/partitionRouteByProtocol";
import { usdcToFulMixedTradeRoute } from "../fixtures/mixedTrades";

describe("partitionRouteByProtocol", () => {
  it("partitions usdc to ful mixed route", async () => {
    const route = usdcToFulMixedTradeRoute();
    const partitionedRoutes = partitionRouteByProtocol(route);

    expect(partitionedRoutes).toHaveLength(2);

    expect(partitionedRoutes[0].pool).toHaveLength(1);
    expect(partitionedRoutes[0].amountIn.address).toBe(route.amountIn.address);
    expect(partitionedRoutes[0].amountOut.address).toBe(route.path[1].address);

    expect(partitionedRoutes[1].pool).toHaveLength(1);
    expect(partitionedRoutes[1].amountIn.address).toBe(route.path[1].address);
    expect(partitionedRoutes[1].amountOut.address).toBe(
      route.amountOut.address,
    );
  });
});
