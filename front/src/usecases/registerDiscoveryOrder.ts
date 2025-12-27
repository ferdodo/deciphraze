import type { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import type { GameContext } from "../contexts/GameContext";
import { characterEquals } from "../utils/characterEquals";

export function registerDiscoveryOrder(context: GameContext): Subscription {
	const {
        discoveryOrderRepository,
        dayRepository,
        playerCipherRepository,
    } = context;

	return playerCipherRepository.playerCipher$.pipe(
		map((playerCipher) => {
			const today = dayRepository.getDay();
			const currentDiscoveryOrder = discoveryOrderRepository.getDiscoveryOrder(today);
			
			Object.entries(playerCipher).forEach(([letter, symbol]) => {
                const isCorrectAssociation = characterEquals(letter, symbol);
                                
                if (isCorrectAssociation && !currentDiscoveryOrder.includes(letter)) {
                    discoveryOrderRepository.addLetterToDiscoveryOrder(today, letter);
                }
			});
			
			return playerCipher;
		})
	).subscribe();
}
