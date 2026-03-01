import type { AllGames } from "../entities/AllGames";
import type { PlayerCipher } from "../entities/PlayerCipher";
import { getCurrentGameDay } from "./getCurrentGameDay";

export const getPlayerCipherFromAllGames = (allGames: AllGames, currentDay: string): PlayerCipher => {
	const gameDay = getCurrentGameDay(allGames, currentDay);
	return allGames.gameByDay[gameDay]?.playerCipher ?? {};
};
