import type { Subscription } from "rxjs";
import { combineLatest } from "rxjs";
import { filter } from "rxjs/operators";
import { calculateAchievements } from "../utils/calculateAchievements";
import { isWin } from "../utils/isWin";
import { createGameSession } from "../utils/createGameSession";
import { generateParagraph } from "../utils/generateParagraph";
import { subscribePlayerCipher } from "../utils/subscribePlayerCipher";
import type { PlayerCipher } from "../entities/PlayerCipher";
import type { GameContext } from "../contexts/GameContext";
import { getCurrentGameDay } from "../utils/getCurrentGameDay";

export function registerWinnedGame({
	allGamesRepository,
	dayRepository,
	gameHistoryRepository,
	achievementRepository,
	discoveryOrderRepository,
	associationHistoryRepository,
}: GameContext): Subscription {
	return combineLatest([
		subscribePlayerCipher(allGamesRepository, dayRepository),
		dayRepository.observeRealTodaysDate(),
	]).pipe(
		filter(([playerCipher, currentDay]: [PlayerCipher, string]) => {
			const allGames = allGamesRepository.get();
			const gameDay = getCurrentGameDay(allGames, currentDay);
			const paragraphOfTheDay = generateParagraph(gameDay);
			const gameHistory = gameHistoryRepository.getHistory();
			return isWin(playerCipher, paragraphOfTheDay, gameHistory, gameDay);
		})
	).subscribe(([, currentDay]: [PlayerCipher, string]) => {
		const allGames = allGamesRepository.get();
		const gameDay = getCurrentGameDay(allGames, currentDay);
		const paragraphOfTheDay = generateParagraph(gameDay);
		const gameSession = createGameSession(gameDay, discoveryOrderRepository, associationHistoryRepository, paragraphOfTheDay);
		gameHistoryRepository.addSession(gameSession);
		const fullHistory = gameHistoryRepository.getHistory();
		const discoveryOrder = discoveryOrderRepository.getDiscoveryOrder(gameDay);
		const existingAchievements = achievementRepository.loadAchievements();
		const newAchievements = calculateAchievements(fullHistory, discoveryOrder, paragraphOfTheDay, associationHistoryRepository, existingAchievements);
		achievementRepository.saveAchievements(newAchievements);
	});
}
