import type { AllGames } from "@deciphraze/core";
import type { SymbolSelection } from "@deciphraze/core";
import { getCurrentGameDay } from "./getCurrentGameDay";

export const getSymbolSelectionFromAllGames = (allGames: AllGames, currentDay: string): SymbolSelection => {
	const gameDay = getCurrentGameDay(allGames, currentDay);
	return allGames.gameByDay[gameDay]?.symbolSelection ?? null;
};
