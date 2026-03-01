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
		dayRepository.observeDay(),
	]).pipe(
		filter(([playerCipher, day]: [PlayerCipher, string]) => {
			const paragraphOfTheDay = generateParagraph(day);
			const gameHistory = gameHistoryRepository.getHistory();
			return isWin(playerCipher, paragraphOfTheDay, gameHistory, day);
		})
	).subscribe(([, day]: [PlayerCipher, string]) => {
		const paragraphOfTheDay = generateParagraph(day);
		const gameSession = createGameSession(day, discoveryOrderRepository, associationHistoryRepository, paragraphOfTheDay);
		gameHistoryRepository.addSession(gameSession);
		const fullHistory = gameHistoryRepository.getHistory();
		const discoveryOrder = discoveryOrderRepository.getDiscoveryOrder(day);
		const existingAchievements = achievementRepository.loadAchievements();
		const newAchievements = calculateAchievements(fullHistory, discoveryOrder, paragraphOfTheDay, associationHistoryRepository, existingAchievements);
		achievementRepository.saveAchievements(newAchievements);
	});
}
