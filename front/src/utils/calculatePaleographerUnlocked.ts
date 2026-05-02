import type { GameHistory } from "@deciphraze/core";
import type { AssociationHistoryRepository } from "@deciphraze/core";
import { isLetterInParagraph } from "./isLetterInParagraph";
import { generateParagraph } from "./generateParagraph";

export function calculatePaleographerUnlocked(
	gameHistory: GameHistory,
	associationHistoryRepository: AssociationHistoryRepository
): boolean {
	return Object.keys(gameHistory).some((day) => {
		const associations = associationHistoryRepository.getHistory(day);
		const paragraphForDay = generateParagraph(day);

		return associations.every((association) => {
			return association.isCorrect && isLetterInParagraph(association.letter, paragraphForDay);
		});
	});
}

