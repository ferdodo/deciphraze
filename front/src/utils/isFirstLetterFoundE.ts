import type { DiscoveryOrder } from "../entities/DiscoveryOrder";

export function isFirstLetterFoundE(discoveryOrder: DiscoveryOrder): boolean {
	return discoveryOrder.length > 0 && discoveryOrder[0] === "E";
}

