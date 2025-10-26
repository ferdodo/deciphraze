import type { GameContextType } from "../types/GameContextType";
import { selectLetter } from "../usecases/selectLetter";
import { selectSymbol } from "../usecases/selectSymbol";
import { characterEquals } from "../utils/characterEquals";

export function asPlayerAssociateOneBadLetter(context: GameContextType): void {
	const { playerCipherRepository } = context;
	const playerCipher = playerCipherRepository.getPlayerCipher();
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	const availableLetters = alphabet.filter(letter => !playerCipher[letter]);
	const availableSymbols = alphabet.filter(symbol => !Object.values(playerCipher).includes(symbol));
	
	const letterToAssociate = availableLetters[0];

	if (letterToAssociate === undefined) {
		throw new Error("Aucune lettre disponible pour association");
	}

	const symbolToAssociate = availableSymbols.find(symbol => !characterEquals(symbol, letterToAssociate));

	if (symbolToAssociate === undefined) {
		throw new Error("Aucun symbole disponible pour association");
	}

	selectLetter(letterToAssociate, context);
	selectSymbol(symbolToAssociate, context);
}
