import type { DiscoveryOrder } from "../types/DiscoveryOrder";

export function isFirstLetterFoundA(discoveryOrder: DiscoveryOrder): boolean {
	return discoveryOrder.length > 0 && discoveryOrder[0] === "A";
}