import type { AllGames } from "../entities/AllGames";
import type { LetterSelection } from "../entities/LetterSelection";
import { getCurrentGameDay } from "./getCurrentGameDay";

export const getLetterSelectionFromAllGames = (allGames: AllGames, currentDay: string): LetterSelection => {
	const gameDay = getCurrentGameDay(allGames, currentDay);
	return allGames.gameByDay[gameDay]?.letterSelection ?? null;
};
