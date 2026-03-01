import type { AllGames } from "../entities/AllGames";
import type { SymbolSelection } from "../entities/SymbolSelection";
import { getCurrentGameDay } from "./getCurrentGameDay";

export const getSymbolSelectionFromAllGames = (allGames: AllGames, currentDay: string): SymbolSelection => {
	const gameDay = getCurrentGameDay(allGames, currentDay);
	return allGames.gameByDay[gameDay]?.symbolSelection ?? null;
};
