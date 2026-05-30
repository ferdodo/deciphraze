import { useMemo } from "react";
import { useCurrentDay } from "./useCurrentDay";
import { useAllGames } from "./useAllGames";
import { getCurrentGameDay } from "../utils/getCurrentGameDay";

export const useGameDay = (): string => {
	const currentDay = useCurrentDay();
	const allGames = useAllGames();

	const gameDay = useMemo(() => {
		return getCurrentGameDay(allGames, currentDay);
	}, [allGames, currentDay]);

	return gameDay;
};
