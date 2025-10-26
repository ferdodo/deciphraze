import type { GameContextType } from "../types/GameContextType";
import { isWin } from "../utils/isWin";
import { asPlayerAssociateOneGoodLetter } from "./asPlayerAssociateOneGoodLetter";

export function asPlayerFinishGame(context: GameContextType): void {
	const { playerCipherRepository, paragraphOfTheDayRepository } = context;
	const paragraphOfTheDay = paragraphOfTheDayRepository.getParagraphOfTheDay();
	let playerCipher = playerCipherRepository.getPlayerCipher();

	while (!isWin(playerCipher, paragraphOfTheDay)) {
		asPlayerAssociateOneGoodLetter(context);
		playerCipher = playerCipherRepository.getPlayerCipher();
	}
}
