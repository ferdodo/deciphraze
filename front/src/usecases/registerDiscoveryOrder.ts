import type { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import type { GameContext } from "../contexts/GameContext";
import { characterEquals } from "../utils/characterEquals";
import { getPlayerCipherFromAllGames } from "../utils/getPlayerCipherFromAllGames";

export function registerDiscoveryOrder(context: GameContext): Subscription {
	const {
        allGamesRepository,
        discoveryOrderRepository,
        dayRepository,
    } = context;

	return allGamesRepository.subscribe().pipe(
		map((allGames) => {
			const today = dayRepository.getRealTodaysDate();
			const playerCipher = getPlayerCipherFromAllGames(allGames, today);
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
