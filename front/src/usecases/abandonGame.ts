import type { GameContext } from "../contexts/GameContext";

export const abandonGame = (context: GameContext): void => {
	const { allGamesRepository, dayRepository, browserService } = context;

	// Demander confirmation avant d'abandonner
	const confirmed = browserService.confirm(
		"Êtes-vous sûr de vouloir abandonner cette partie ?\n\nLa partie sera supprimée définitivement."
	);

	if (!confirmed) {
		return;
	}

	const currentDay = dayRepository.getDay();
	const allGames = allGamesRepository.get();

	// Récupérer le jour de la partie actuelle
	const days = Object.keys(allGames.gameByDay).sort();
	if (days.length === 0) {
		return;
	}

	const gameDay = days[0];

	// Supprimer la partie actuelle
	allGamesRepository.clear();
	
	// Repeupler avec toutes les parties sauf celle-ci
	Object.entries(allGames.gameByDay).forEach(([day, gameData]) => {
		if (day !== gameDay) {
			allGamesRepository.upsertByDay(day, gameData);
		}
	});

	// Changer au jour d'aujourd'hui
	dayRepository.setDay(currentDay);
};
