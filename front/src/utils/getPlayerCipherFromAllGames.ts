import type { AllGames } from "@deciphraze/core";
import type { PlayerCipher } from "@deciphraze/core";
import { getCurrentGameDay } from "./getCurrentGameDay";

export const getPlayerCipherFromAllGames = (allGames: AllGames, currentDay: string): PlayerCipher => {
	const gameDay = getCurrentGameDay(allGames, currentDay);
	return allGames.gameByDay[gameDay]?.playerCipher ?? {};
};
