import { useState, useEffect } from "react";
import { useGameContext } from "./useGameContext";
import { getCurrentDay } from "../utils/getCurrentDay";
import { observeCurrentDay } from "../utils/observeCurrentDay";

export const useCurrentDay = (): string => {
	const { timeService, forcedDayRepository } = useGameContext();
	const [currentDay, setCurrentDay] = useState<string>(getCurrentDay(timeService, forcedDayRepository));

	useEffect(() => {
		const subscription = observeCurrentDay(timeService, forcedDayRepository).subscribe((day: string) => {
			setCurrentDay(day);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [forcedDayRepository, timeService]);

	return currentDay;
};
