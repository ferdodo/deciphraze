import type { AllGames } from "../entities/AllGames";

export const getCurrentGameDay = (allGames: AllGames, currentDay: string): string => {
	const days = Object.keys(allGames.gameByDay);
	if (days.length === 0) {
		return currentDay;
	}
	return days.sort()[0];
};
