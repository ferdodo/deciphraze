import { useMemo } from "react";
import { useDay } from "./useDay";
import { useAllGames } from "./useAllGames";
import { getCurrentGameDay } from "../utils/getCurrentGameDay";

export const useGameDay = (): string => {
	const currentDay = useDay();
	const allGames = useAllGames();

	const gameDay = useMemo(() => {
		return getCurrentGameDay(allGames, currentDay);
	}, [allGames, currentDay]);

	return gameDay;
};
