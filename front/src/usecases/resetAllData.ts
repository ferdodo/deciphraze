import type { GameContext } from "@deciphraze/core";

export const resetAllData = (context: GameContext): void => {
	const { browserService } = context;

	// Demander confirmation avant de réinitialiser
	const confirmed = browserService.confirm(
		"Êtes-vous sûr de vouloir réinitialiser toutes les données de l'application ?\n\n" +
		"Cette action supprimera définitivement :\n" +
		"- L'historique des parties\n" +
		"- Les statistiques\n" +
		"- Les succès\n" +
		"- Les notifications de succès vus\n" +
		"- Les associations\n" +
		"- L'ordre de découverte\n\n" +
		"Cette action est irréversible."
	);

	if (!confirmed) {
		return;
	}

	browserService.clearStorage();
	browserService.refreshPage();
};
