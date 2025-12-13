import type { Subscription } from "rxjs";
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
	const day = dayRepository.getDay();
	const paragraphOfTheDay = getParagraphOfTheDay(day);

	return playerCipherRepository.playerCipher$.pipe(
		filter((playerCipher: PlayerCipher) => {
			const gameHistory = gameHistoryRepository.getHistory();
			return isWin(playerCipher, paragraphOfTheDay, gameHistory, day);
		})
	).subscribe(() => {
		const gameSession = createGameSession(day, discoveryOrderRepository, paragraphOfTheDay);
		gameHistoryRepository.addSession(gameSession);
		const fullHistory = gameHistoryRepository.getHistory();
		const discoveryOrder = discoveryOrderRepository.getDiscoveryOrder(day);
		const newAchievements = calculateAchievements(fullHistory, discoveryOrder, paragraphOfTheDay);
		achievementRepository.saveAchievements(newAchievements);
	});
}
