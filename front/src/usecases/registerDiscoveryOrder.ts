import type { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import type { GameContext } from "@deciphraze/core";
import { characterEquals } from "../utils/characterEquals";
import { getCurrentDay } from "../utils/getCurrentDay";
import { getPlayerCipherFromAllGames } from "../utils/getPlayerCipherFromAllGames";
import { getCurrentGameDay } from "../utils/getCurrentGameDay";

export function registerDiscoveryOrder(context: GameContext): Subscription {
	const {
        allGamesRepository,
        discoveryOrderRepository,
        timeService,
        forcedDayRepository,
    } = context;

	return allGamesRepository.subscribe().pipe(
		map((allGames) => {
			const today = getCurrentDay(timeService, forcedDayRepository);
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
