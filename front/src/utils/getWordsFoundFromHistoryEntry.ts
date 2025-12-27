import type { GameSession } from "../entities/GameSession";

// Fonction utilitaire pour extraire le nombre de mots trouvés (gère la rétrocompatibilité)
export function getWordsFoundFromHistoryEntry(entry: string[] | GameSession): number {
	if (Array.isArray(entry)) {
		return 0; // Anciennes sessions sans wordsFound
	}
	return entry.wordsFound ?? 0;
}

