import { registerWinnedGame } from "../usecases/registerWinnedGame";
import { registerDiscoveryOrder } from "../usecases/registerDiscoveryOrder";
import type { GameContextType } from "../types/GameContextType";

export function initializeGameSideEffects(context: GameContextType): () => void {
	const registerWinnedGameSubscription = registerWinnedGame(context);
	const registerDiscoveryOrderSubscription = registerDiscoveryOrder(context);

	return () => {
		registerWinnedGameSubscription.unsubscribe();
		registerDiscoveryOrderSubscription.unsubscribe();
	};
}
