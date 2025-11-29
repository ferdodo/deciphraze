import { registerWinnedGame } from "../usecases/registerWinnedGame";
import { registerDiscoveryOrder } from "../usecases/registerDiscoveryOrder";
import { updateStatistics } from "../usecases/updateStatistics";
import type { GameContextType } from "../types/GameContextType";

export function initializeGameSideEffects(context: GameContextType): () => void {
	const registerWinnedGameSubscription = registerWinnedGame(context);
	const registerDiscoveryOrderSubscription = registerDiscoveryOrder(context);
	const updateStatisticsSubscription = updateStatistics(context);

	return () => {
		registerWinnedGameSubscription.unsubscribe();
		registerDiscoveryOrderSubscription.unsubscribe();
		updateStatisticsSubscription.unsubscribe();
	};
}
