import { useState, useEffect } from "react";
import { useGameContext } from "./useGameContext";
import { useCurrentDay } from "./useCurrentDay";
import type { AssociationEntry } from "../entities/AssociationEntry";

export const useAssociationHistory = (): AssociationEntry[] => {
	const { allGamesRepository, associationHistoryRepository } = useGameContext();
	const currentDay = useCurrentDay();
	const [history, setHistory] = useState<AssociationEntry[]>(() =>
		associationHistoryRepository.getHistory(currentDay)
	);

	useEffect(() => {
		const subscription = allGamesRepository.subscribe().subscribe(() => {
			setHistory(associationHistoryRepository.getHistory(currentDay));
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [allGamesRepository, associationHistoryRepository, currentDay]);

	return history;
};
