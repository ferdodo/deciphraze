import type { DiscoveryOrder } from "../types/DiscoveryOrder";

export function isFirstLetterFoundE(discoveryOrder: DiscoveryOrder): boolean {
	return discoveryOrder.length > 0 && discoveryOrder[0] === "E";
}

