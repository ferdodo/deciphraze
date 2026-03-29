import { useState, useEffect } from "react";
import { useGameContext } from "./useGameContext";

export const useDay = (): string => {
	const { dayRepository } = useGameContext();
	const [day, setDay] = useState<string>(dayRepository.getRealTodaysDate());

	useEffect(() => {
		const subscription = dayRepository.observeRealTodaysDate().subscribe((newDay: string) => {
			setDay(newDay);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [dayRepository]);

	return day;
};

