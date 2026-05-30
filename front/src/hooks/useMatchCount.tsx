import { useState, useEffect } from "react";
import { useGameContext } from "./useGameContext";
import { createMatchCount$ } from "../utils/createMatchCount$";

export const useMatchCount = (): number => {
	const { allGamesRepository, forcedDayRepository, timeService } = useGameContext();
	const [matchCount, setMatchCount] = useState(0);

	useEffect(() => {
		const matchCount$ = createMatchCount$(allGamesRepository, timeService, forcedDayRepository);
		const matchCountSubscription = matchCount$.subscribe((value) =>
			setMatchCount(value),
		);

		return () => {
			matchCountSubscription.unsubscribe();
		};
	}, [allGamesRepository, forcedDayRepository, timeService]);

	return matchCount;
};
