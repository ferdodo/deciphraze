import type { DiscoveryOrder } from "@deciphraze/core";

export function isFirstLetterFoundY(discoveryOrder: DiscoveryOrder): boolean {
	return discoveryOrder.length > 0 && discoveryOrder[0] === "Y";
}

