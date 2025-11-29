import { useState, useEffect } from "react";
import { useGameContext } from "../contexts/useGameContext";
import type { Statistics } from "../types/Statistics";

export const useStatistics = (): Statistics => {
	const { statisticsRepository } = useGameContext();
	const [statistics, setStatistics] = useState<Statistics>(statisticsRepository.getStatistics());

	useEffect(() => {
		const subscription = statisticsRepository.statistics$.subscribe((newStatistics: Statistics) => {
			setStatistics(newStatistics);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [statisticsRepository]);

	return statistics;
};

