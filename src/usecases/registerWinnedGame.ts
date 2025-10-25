import type { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { calculateAchievements } from "../utils/calculateAchievements";
import { isWin } from "../utils/isWin";
import { createGameSession } from "../utils/createGameSession";
import type { PlayerCipher } from "../types/PlayerCipher";
import { GameContextType } from "../types/GameContextType";

export function registerWinnedGame({
	dayRepository,
	paragraphOfTheDayRepository,
	playerCipherRepository,
	gameHistoryRepository,
	achievementRepository,
}: GameContextType): Subscription {
	const day = dayRepository.getDay();
	const paragraphOfTheDay = paragraphOfTheDayRepository.getParagraphOfTheDay();

	return playerCipherRepository.playerCipher$.pipe(
		filter((playerCipher: PlayerCipher) => isWin(playerCipher, paragraphOfTheDay))
	).subscribe((playerCipher: Record<string, string>) => {
		const gameHistory = gameHistoryRepository.getHistory();

		if (gameHistory[day]) {
			return;
		}

		const gameSession = createGameSession(day, paragraphOfTheDay, playerCipher);
		gameHistoryRepository.addSession(gameSession);
		const fullHistory = gameHistoryRepository.getHistory();
		const newAchievements = calculateAchievements(fullHistory);
		achievementRepository.saveAchievements(newAchievements);
	});
}
