import type { GameContext } from "@deciphraze/core";

export const abandonGame = (context: GameContext): void => {
	const { allGamesRepository, browserService } = context;

	// Demander confirmation avant d'abandonner
	const confirmed = browserService.confirm(
		"Êtes-vous sûr de vouloir abandonner cette partie ?\n\nLa partie sera supprimée définitivement."
	);

	if (!confirmed) {
		return;
	}

	const allGames = allGamesRepository.get();

	// Récupérer le jour de la partie actuelle
	const days = Object.keys(allGames.gameByDay).sort();
	if (days.length === 0) {
		return;
	}

	const gameDay = days[0];

	allGamesRepository.removeByDay(gameDay);

};
