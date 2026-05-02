import type { DiscoveryOrder } from "@deciphraze/core";

const VOWELS: Set<string> = new Set(["A", "E", "I", "O", "U", "Y"]);

export function hasFoundAllVowelsInSequence(discoveryOrder: DiscoveryOrder): boolean {
	if (discoveryOrder.length < 6) {
		return false;
	}
	
	// Chercher une séquence de 6 lettres consécutives qui contient toutes les voyelles
	for (let i = 0; i <= discoveryOrder.length - 6; i++) {
		const sequence = discoveryOrder.slice(i, i + 6);
		const vowelsInSequence = new Set(
			sequence.map((letter: string) => letter.toUpperCase()).filter((letter: string) => VOWELS.has(letter))
		);
		
		if (vowelsInSequence.size === 6) {
			return true;
		}
	}
	
	return false;
}

