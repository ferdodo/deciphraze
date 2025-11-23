import type { DiscoveryOrder } from "../types/DiscoveryOrder";

export function isFirstLetterFoundQ(discoveryOrder: DiscoveryOrder): boolean {
	return discoveryOrder.length > 0 && discoveryOrder[0].toUpperCase() === "Q";
}

