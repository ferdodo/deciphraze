import type { GameSession } from "../types/GameSession";
import type { DiscoveryOrderRepository } from "../types/DiscoveryOrderRepository";
import { countWordsInParagraph } from "./countWordsInParagraph";

export function createGameSession(
	day: string,
	discoveryOrderRepository: DiscoveryOrderRepository,
	paragraphOfTheDay: string,
): GameSession {
	const discoveryOrder = discoveryOrderRepository.getDiscoveryOrder(day);
	const wordsFound = countWordsInParagraph(paragraphOfTheDay);

	return {
		winAt: day,
		lettersFound: discoveryOrder,
		wordsFound
	};
}
