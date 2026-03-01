import { useDay } from "./useDay";
import { useGameContext } from "./useGameContext";
import { getCurrentGameDay } from "../utils/getCurrentGameDay";

export const useIsTodayGame = (): boolean => {
	const currentDay = useDay();
	const { allGamesRepository } = useGameContext();
	
	const allGames = allGamesRepository.get();
	const gameDay = getCurrentGameDay(allGames, currentDay);
	
	return currentDay === gameDay;
};
