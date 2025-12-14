import type { Subscription } from "rxjs";
import { combineLatest } from "rxjs";
import { filter } from "rxjs/operators";
import { calculateAchievements } from "../utils/calculateAchievements";
import { isWin } from "../utils/isWin";
import { createGameSession } from "../utils/createGameSession";
import { getParagraphOfTheDay } from "../utils/getParagraphOfTheDay";
import type { PlayerCipher } from "../entities/PlayerCipher";
import type { GameContext } from "../contexts/GameContext";

export function registerWinnedGame({
	dayRepository,
	playerCipherRepository,
	gameHistoryRepository,
	achievementRepository,
	discoveryOrderRepository,
}: GameContext): Subscription {
	return combineLatest([
		playerCipherRepository.playerCipher$,
		dayRepository.observeDay(),
	]).pipe(
		filter(([playerCipher, day]: [PlayerCipher, string]) => {
			const paragraphOfTheDay = getParagraphOfTheDay(day);
			const gameHistory = gameHistoryRepository.getHistory();
			return isWin(playerCipher, paragraphOfTheDay, gameHistory, day);
		})
	).subscribe(([, day]: [PlayerCipher, string]) => {
		const paragraphOfTheDay = getParagraphOfTheDay(day);
		const gameSession = createGameSession(day, discoveryOrderRepository, paragraphOfTheDay);
		gameHistoryRepository.addSession(gameSession);
		const fullHistory = gameHistoryRepository.getHistory();
		const discoveryOrder = discoveryOrderRepository.getDiscoveryOrder(day);
		const existingAchievements = achievementRepository.loadAchievements();
		const newAchievements = calculateAchievements(fullHistory, discoveryOrder, paragraphOfTheDay, existingAchievements);
		achievementRepository.saveAchievements(newAchievements);
	});
}
