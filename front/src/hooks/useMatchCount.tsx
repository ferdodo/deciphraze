import { useState, useEffect } from "react";
import { usePlayerCipherRepository } from "./usePlayerCipherRepository";
import { createMatchCount$ } from "../utils/createMatchCount$";

export const useMatchCount = (): number => {
	const playerCipherRepository = usePlayerCipherRepository();
	const [matchCount, setMatchCount] = useState(0);

	useEffect(() => {
		const matchCount$ = createMatchCount$(playerCipherRepository);
		const matchCountSubscription = matchCount$.subscribe((value) =>
			setMatchCount(value),
		);

		return () => {
			matchCountSubscription.unsubscribe();
		};
	}, [playerCipherRepository]);

	return matchCount;
};
