import type { PreferredLetter } from "../types/PreferredLetter";

const POSITION_WEIGHTS: readonly number[] = [1.4, 1.3, 1.2, 1.1, 1.0];

export function calculatePreferredLetters(
	letterPositions: Array<Array<string>>,
	topN: number
): Array<PreferredLetter> {
	// Map pour stocker les scores par lettre
	const letterScores: Record<string, number> = {};

	// Parcourir toutes les parties
	letterPositions.forEach((gameLetters) => {
		// Parcourir les 5 premières lettres de chaque partie
		gameLetters.slice(0, 5).forEach((letter, positionIndex) => {
			const normalizedLetter = letter.toUpperCase();
			const weight = POSITION_WEIGHTS[positionIndex] || 1.0;
			
			// Initialiser le score à 0 si la lettre n'existe pas encore
			if (!letterScores[normalizedLetter]) {
				letterScores[normalizedLetter] = 0;
			}
			
			// Ajouter le score pondéré
			letterScores[normalizedLetter] += weight;
		});
	});

	// Convertir en tableau et trier par score décroissant
	const preferredLetters: Array<PreferredLetter> = Object.entries(letterScores)
		.map(([letter, score]) => ({ letter, score }))
		.sort((a, b) => b.score - a.score)
		.slice(0, topN);

	return preferredLetters;
}

