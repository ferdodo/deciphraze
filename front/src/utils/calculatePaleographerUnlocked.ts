import type { GameHistory } from "../entities/GameHistory";
import type { AssociationHistoryRepository } from "../repositories/AssociationHistoryRepository";
import { isLetterInParagraph } from "./isLetterInParagraph";
import { getParagraphOfTheDay } from "./getParagraphOfTheDay";

export function calculatePaleographerUnlocked(
	gameHistory: GameHistory,
	associationHistoryRepository: AssociationHistoryRepository
): boolean {
	// Vérifier s'il existe au moins une partie sans erreur valide
	// Une association est valide si elle est correcte dans le cipher ET la lettre est présente dans le paragraphe
	return Object.keys(gameHistory).some((day) => {
		const associations = associationHistoryRepository.getHistory(day);
		if (associations.length === 0) {
			// Pour la rétrocompatibilité, si aucune association n'existe, considérer comme sans erreur
			const entry = gameHistory[day];
			if (typeof entry === "object" && "hasErrors" in entry) {
				return entry.hasErrors === false || entry.hasErrors === undefined;
			}
			return true;
		}
		
		const paragraphForDay = getParagraphOfTheDay(day);
		// Vérifier que toutes les associations sont valides
		return associations.every((association) => {
			return association.isCorrect && isLetterInParagraph(association.letter, paragraphForDay);
		});
	});
}

