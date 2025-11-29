import type { GameContext } from "../contexts/GameContext";
import { selectLetter } from "../usecases/selectLetter";
import { selectSymbol } from "../usecases/selectSymbol";
import { normalizeWord } from "../utils/normalizeWord";

export function asPlayerFinishGameStartingWithLetter(context: GameContext, firstLetter: string): void {
	const cipher = context.cipherRepository.getCipher();
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	const normalizedFirstLetter = normalizeWord(firstLetter).toUpperCase();
	
	if (!alphabet.includes(normalizedFirstLetter)) {
		throw new Error(`La lettre '${firstLetter}' n'est pas une lettre valide`);
	}
	
	const firstLetterIndex = alphabet.indexOf(normalizedFirstLetter);
	selectLetter(normalizedFirstLetter, context);
	selectSymbol(cipher[firstLetterIndex], context);
	
	alphabet.filter(letter => letter !== normalizedFirstLetter).forEach((letter) => {
		const letterIndex = alphabet.indexOf(letter);
		selectLetter(letter, context);
		selectSymbol(cipher[letterIndex], context);
	});
}
