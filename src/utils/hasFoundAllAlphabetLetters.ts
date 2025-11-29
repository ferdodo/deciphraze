import type { GameHistory } from "../types/GameHistory";
import type { GameSession } from "../types/GameSession";

export function hasFoundAllAlphabetLetters(
	gameHistory: GameHistory
): { unlocked: boolean; progress: { current: number; target: 26 } } {
	const allLettersFound = new Set<string>();

	// Parcourir toutes les parties et collecter toutes les lettres trouvées
	Object.values(gameHistory).forEach((value) => {
		const letters: string[] = Array.isArray(value) 
			? value 
			: (value as GameSession).lettersFound;
		
		letters.forEach((letter: string) => {
			allLettersFound.add(letter.toUpperCase());
		});
	});

	const current = allLettersFound.size;
	const target = 26 as const;
	const unlocked = current >= target;

	return {
		unlocked,
		progress: { current, target }
	};
}

