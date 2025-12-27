import type { GameSession } from "../entities/GameSession";

// Fonction utilitaire pour extraire les lettres trouvées (gère la rétrocompatibilité)
export function getLettersFoundFromHistoryEntry(entry: string[] | GameSession): string[] {
	if (Array.isArray(entry)) {
		return entry;
	}
	return entry.lettersFound;
}

