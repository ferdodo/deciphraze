import type { GameContext } from "../contexts/GameContext";
import { getCurrentDay } from "../utils/getCurrentDay";

export const playTodayGame = (context: GameContext): void => {
	const { allGamesRepository, timeService, forcedDayRepository } = context;
	const today = getCurrentDay(timeService, forcedDayRepository);
	
	// Garder seulement la partie d'aujourd'hui et supprimer les autres
	const allGames = allGamesRepository.get();
	const gamesFilteredByDay: Record<string, typeof allGames.gameByDay[string]> = {};
	
	// Garder les jeux d'aujourd'hui et dans le futur
	Object.entries(allGames.gameByDay).forEach(([day, gameData]) => {
		if (day >= today) {
			gamesFilteredByDay[day] = gameData;
		}
	});
	
	// Vider complètement et repeupler avec les jeux filtrés
	allGamesRepository.clear();
	Object.entries(gamesFilteredByDay).forEach(([day, gameData]) => {
		allGamesRepository.upsertByDay(day, gameData);
	});
	
};
