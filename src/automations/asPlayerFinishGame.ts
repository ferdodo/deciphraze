import type { GameContext } from "../contexts/GameContext";
import { isWin } from "../utils/isWin";
import { getParagraphOfTheDay } from "../utils/getParagraphOfTheDay";
import { asPlayerAssociateOneGoodLetter } from "./asPlayerAssociateOneGoodLetter";

export function asPlayerFinishGame(context: GameContext): void {
	const { playerCipherRepository, gameHistoryRepository, dayRepository } = context;
	const currentDay = dayRepository.getDay();
	const paragraphOfTheDay = getParagraphOfTheDay(currentDay);
	const gameHistory = gameHistoryRepository.getHistory();
	let playerCipher = playerCipherRepository.getPlayerCipher();

	while (!isWin(playerCipher, paragraphOfTheDay, gameHistory, currentDay)) {
		asPlayerAssociateOneGoodLetter(context);
		playerCipher = playerCipherRepository.getPlayerCipher();
	}
}
