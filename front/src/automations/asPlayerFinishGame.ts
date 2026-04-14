import type { GameContext } from "../contexts/GameContext";
import { isWin } from "../utils/isWin";
import { generateParagraph } from "../utils/generateParagraph";
import { asPlayerAssociateOneGoodLetter } from "./asPlayerAssociateOneGoodLetter";
import { getCurrentDay } from "../utils/getCurrentDay";
import { getPlayerCipherFromAllGames } from "../utils/getPlayerCipherFromAllGames";

export function asPlayerFinishGame(context: GameContext): void {
	const { allGamesRepository, gameHistoryRepository, timeService, forcedDayRepository } = context;
	const currentDay = getCurrentDay(timeService, forcedDayRepository);
	const paragraphOfTheDay = generateParagraph(currentDay);
	const gameHistory = gameHistoryRepository.getHistory();
	let allGames = allGamesRepository.get();
	let playerCipher = getPlayerCipherFromAllGames(allGames, currentDay);

	while (!isWin(playerCipher, paragraphOfTheDay, gameHistory, currentDay)) {
		asPlayerAssociateOneGoodLetter(context);
		allGames = allGamesRepository.get();
		playerCipher = getPlayerCipherFromAllGames(allGames, currentDay);
	}
}
