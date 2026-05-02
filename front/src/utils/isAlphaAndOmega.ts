import type { DiscoveryOrder } from "@deciphraze/core";
import { isAlphabetic } from "./isAlphabetic";

export function isAlphaAndOmega(paragraph: string, discoveryOrder: DiscoveryOrder): boolean {
	if (discoveryOrder.length === 0) {
		return false;
	}

	// Extraire toutes les lettres du paragraphe (ignorer ponctuation et espaces)
	const letters = [...paragraph]
		.filter(char => isAlphabetic(char))
		.map(char => char.toUpperCase());

	if (letters.length === 0) {
		return false;
	}

	const firstLetter = letters[0];
	const lastLetter = letters[letters.length - 1];

	// Vérifier si la première lettre trouvée correspond à la première lettre du paragraphe
	const firstDiscoveredLetter = discoveryOrder[0].toUpperCase();
	// Vérifier si la dernière lettre trouvée correspond à la dernière lettre du paragraphe
	const lastDiscoveredLetter = discoveryOrder[discoveryOrder.length - 1].toUpperCase();

	return firstDiscoveredLetter === firstLetter && lastDiscoveredLetter === lastLetter;
}

