import { useMemo } from "react";
import { useCurrentDay } from "./useCurrentDay";
import { useGameHistory } from "./useGameHistory";
import { calculateCurrentStreak } from "../utils/calculateCurrentStreak";

export const useCurrentStreak = (): number => {
	const currentDay = useCurrentDay();
	const gameHistory = useGameHistory();
	
	const streak = useMemo(() => {
		return calculateCurrentStreak(gameHistory, currentDay);
	}, [gameHistory, currentDay]);
	
	return streak;
};
