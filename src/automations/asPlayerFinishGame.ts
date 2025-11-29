import type { GameContext } from "../contexts/GameContext";
import { isWin } from "../utils/isWin";
import { asPlayerAssociateOneGoodLetter } from "./asPlayerAssociateOneGoodLetter";

export function asPlayerFinishGame(context: GameContext): void {
	const { playerCipherRepository, paragraphOfTheDayRepository, gameHistoryRepository, dayRepository } = context;
	const paragraphOfTheDay = paragraphOfTheDayRepository.getParagraphOfTheDay();
	const currentDay = dayRepository.getDay();
	const gameHistory = gameHistoryRepository.getHistory();
	let playerCipher = playerCipherRepository.getPlayerCipher();

	while (!isWin(playerCipher, paragraphOfTheDay, gameHistory, currentDay)) {
		asPlayerAssociateOneGoodLetter(context);
		playerCipher = playerCipherRepository.getPlayerCipher();
	}
}
