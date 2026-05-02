import type { GameSession } from "@deciphraze/core";
import type { DiscoveryOrderRepository } from "@deciphraze/core";
import type { AssociationHistoryRepository } from "@deciphraze/core";
import { countWordsInParagraph } from "./countWordsInParagraph";

export function createGameSession(
	day: string,
	discoveryOrderRepository: DiscoveryOrderRepository,
	associationHistoryRepository: AssociationHistoryRepository,
	paragraphOfTheDay: string,
): GameSession {
	const discoveryOrder = discoveryOrderRepository.getDiscoveryOrder(day);
	const wordsFound = countWordsInParagraph(paragraphOfTheDay);
	const hasErrors = associationHistoryRepository.hasErrors(day);

	return {
		winAt: day,
		lettersFound: discoveryOrder,
		wordsFound,
		hasErrors
	};
}
