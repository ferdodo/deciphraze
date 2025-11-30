import type { GameSession } from "../entities/GameSession";
import type { DiscoveryOrderRepository } from "../repositories/DiscoveryOrderRepository";
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
