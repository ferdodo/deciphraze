import type { GameContext } from "../contexts/GameContext";

export const playTodayGame = (context: GameContext): void => {
	const { dayRepository, allGamesRepository } = context;
	const today = dayRepository.getDay();
	
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
	
	// Changer au jour d'aujourd'hui
	dayRepository.setDay(today);
};
