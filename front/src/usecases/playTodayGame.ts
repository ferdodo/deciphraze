import type { GameContext } from "../contexts/GameContext";
import { getCurrentDay } from "../utils/getCurrentDay";

export const playTodayGame = (context: GameContext): void => {
	const { allGamesRepository, timeService, forcedDayRepository } = context;
	const today = getCurrentDay(timeService, forcedDayRepository);
	const allGames = allGamesRepository.get();

	Object.keys(allGames.gameByDay).forEach((day) => {
		if (day < today) {
			allGamesRepository.removeByDay(day);
		}
	});
};
