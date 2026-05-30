import type { DiscoveryOrder } from "@deciphraze/core";

export function isFirstLetterFoundA(discoveryOrder: DiscoveryOrder): boolean {
	return discoveryOrder.length > 0 && discoveryOrder[0] === "A";
}
