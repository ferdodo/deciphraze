import { useState, useEffect } from "react";
import { useGameContext } from "./useGameContext";
import { createMatchCount$ } from "../utils/createMatchCount$";

export const useMatchCount = (): number => {
	const { allGamesRepository, dayRepository } = useGameContext();
	const [matchCount, setMatchCount] = useState(0);

	useEffect(() => {
		const matchCount$ = createMatchCount$(allGamesRepository, dayRepository);
		const matchCountSubscription = matchCount$.subscribe((value) =>
			setMatchCount(value),
		);

		return () => {
			matchCountSubscription.unsubscribe();
		};
	}, [allGamesRepository, dayRepository]);

	return matchCount;
};
