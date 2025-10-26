import type { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { calculateAchievements } from "../utils/calculateAchievements";
import { isWin } from "../utils/isWin";
import { createGameSession } from "../utils/createGameSession";
import type { PlayerCipher } from "../types/PlayerCipher";
import type { GameContextType } from "../types/GameContextType";

export function registerWinnedGame({
	dayRepository,
	paragraphOfTheDayRepository,
	playerCipherRepository,
	gameHistoryRepository,
	achievementRepository,
	discoveryOrderRepository,
}: GameContextType): Subscription {
	const day = dayRepository.getDay();
	const paragraphOfTheDay = paragraphOfTheDayRepository.getParagraphOfTheDay();

	return playerCipherRepository.playerCipher$.pipe(
		filter((playerCipher: PlayerCipher) => isWin(playerCipher, paragraphOfTheDay))
	).subscribe(() => {
		const gameSession = createGameSession(day, discoveryOrderRepository);
		gameHistoryRepository.addSession(gameSession);
		const fullHistory = gameHistoryRepository.getHistory();
		const discoveryOrder = discoveryOrderRepository.getDiscoveryOrder(day);
		const newAchievements = calculateAchievements(fullHistory, discoveryOrder);
		achievementRepository.saveAchievements(newAchievements);
	});
}
