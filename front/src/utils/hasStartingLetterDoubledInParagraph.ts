import type { DiscoveryOrder } from "../entities/DiscoveryOrder";

export function hasStartingLetterDoubledInParagraph(
	paragraph: string,
	discoveryOrder: DiscoveryOrder
): boolean {
	if (discoveryOrder.length === 0) {
		return false;
	}

	const firstDiscoveredLetter = discoveryOrder[0].toUpperCase();
	const paragraphUpperCase = paragraph.toUpperCase();
	
	const doubledPattern = firstDiscoveredLetter + firstDiscoveredLetter;
	return paragraphUpperCase.includes(doubledPattern);
}
