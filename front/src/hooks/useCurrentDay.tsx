import { useState, useEffect } from "react";
import { useGameContext } from "./useGameContext";

export const useCurrentDay = (): string => {
	const { dayRepository } = useGameContext();
	const [currentDay, setCurrentDay] = useState<string>(dayRepository.getRealTodaysDate());

	useEffect(() => {
		const subscription = dayRepository.observeRealTodaysDate().subscribe((day: string) => {
			setCurrentDay(day);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [dayRepository]);

	return currentDay;
};
