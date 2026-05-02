import type { AllGames } from "@deciphraze/core";
import type { LetterSelection } from "@deciphraze/core";
import { getCurrentGameDay } from "./getCurrentGameDay";

export const getLetterSelectionFromAllGames = (allGames: AllGames, currentDay: string): LetterSelection => {
	const gameDay = getCurrentGameDay(allGames, currentDay);
	return allGames.gameByDay[gameDay]?.letterSelection ?? null;
};
