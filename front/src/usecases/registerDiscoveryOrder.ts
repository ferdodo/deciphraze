import type { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import type { GameContext } from "../contexts/GameContext";
import { characterEquals } from "../utils/characterEquals";
import { getPlayerCipherFromAllGames } from "../utils/getPlayerCipherFromAllGames";
import { getCurrentGameDay } from "../utils/getCurrentGameDay";

export function registerDiscoveryOrder(context: GameContext): Subscription {
	const {
        allGamesRepository,
        discoveryOrderRepository,
        dayRepository,
    } = context;

	return allGamesRepository.subscribe().pipe(
		map((allGames) => {
			const today = dayRepository.getRealTodaysDate();
			const gameDay = getCurrentGameDay(allGames, today);
			const playerCipher = getPlayerCipherFromAllGames(allGames, today);
			const currentDiscoveryOrder = discoveryOrderRepository.getDiscoveryOrder(gameDay);
			
			Object.entries(playerCipher).forEach(([letter, symbol]) => {
                const isCorrectAssociation = characterEquals(letter, symbol);
                                
                if (isCorrectAssociation && !currentDiscoveryOrder.includes(letter)) {
                    discoveryOrderRepository.addLetterToDiscoveryOrder(gameDay, letter);
                }
			});
			
			return playerCipher;
		})
	).subscribe();
}
