import type { GameSession } from "../types/GameSession";
import type { DiscoveryOrderRepository } from "../types/DiscoveryOrderRepository";

export function createGameSession(
	day: string,
	discoveryOrderRepository: DiscoveryOrderRepository,
): GameSession {
	const discoveryOrder = discoveryOrderRepository.getDiscoveryOrder(day);

	return {
		winAt: day,
		lettersFound: discoveryOrder
	};
}
