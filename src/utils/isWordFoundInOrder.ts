import type { DiscoveryOrder } from "../entities/DiscoveryOrder";

export function isWordFoundInOrder(paragraph: string, discoveryOrder: DiscoveryOrder): boolean {
	// Extraire tous les mots du paragraphe (ignorer la ponctuation)
	const words = paragraph
		.split(/\s+/)
		.map(word => word.replace(/[^A-Za-zÀ-ÿ]/g, "").toUpperCase())
		.filter(word => word.length >= 5);

	// Pour chaque mot d'au moins 5 lettres, vérifier si toutes ses lettres apparaissent dans l'ordre
	for (const word of words) {
		if (isWordInDiscoveryOrder(word, discoveryOrder)) {
			return true;
		}
	}

	return false;
}

function isWordInDiscoveryOrder(word: string, discoveryOrder: DiscoveryOrder): boolean {
	// Vérifier si toutes les lettres du mot apparaissent consécutivement dans l'ordre de découverte
	// On cherche une séquence consécutive dans discoveryOrder qui correspond exactement au mot
	for (let i = 0; i <= discoveryOrder.length - word.length; i++) {
		let matches = true;
		for (let j = 0; j < word.length; j++) {
			if (discoveryOrder[i + j].toUpperCase() !== word[j]) {
				matches = false;
				break;
			}
		}
		if (matches) {
			return true;
		}
	}

	return false;
}

