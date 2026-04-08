import type { DiscoveryOrder } from "../entities/DiscoveryOrder";
import { normalizeWord } from "./normalizeWord";

export function hasStartingLetterDoubledInParagraph(
	paragraph: string,
	discoveryOrder: DiscoveryOrder
): boolean {
	if (discoveryOrder.length === 0) {
		return false;
	}

	const firstDiscoveredLetter = discoveryOrder[0].toUpperCase();
	const normalizedParagraph = normalizeWord(paragraph).toUpperCase();

	const doubledPattern = firstDiscoveredLetter + firstDiscoveredLetter;
	return normalizedParagraph.includes(doubledPattern);
}
