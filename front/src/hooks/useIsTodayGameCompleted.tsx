import { useGameHistory } from "./useGameHistory";
import { useRealTodayDate } from "./useRealTodayDate";

export const useIsTodayGameCompleted = (): boolean => {
	const gameHistory = useGameHistory();
	const realTodayDate = useRealTodayDate();

	const todaySession = gameHistory[realTodayDate];
	return todaySession && !Array.isArray(todaySession) && !!todaySession.winAt;
};
