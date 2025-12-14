import { useMemo } from "react";
import { useDay } from "./useDay";
import { useGameHistory } from "./useGameHistory";
import { calculateCurrentStreak } from "../utils/calculateCurrentStreak";

export const useCurrentStreak = (): number => {
	const currentDay = useDay();
	const gameHistory = useGameHistory();
	
	const streak = useMemo(() => {
		return calculateCurrentStreak(gameHistory, currentDay);
	}, [gameHistory, currentDay]);
	
	return streak;
};

