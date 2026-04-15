import type React from "react";
import { useEffect, useState } from "react";
import { useGameContext } from "../hooks/useGameContext";
import { getCurrentDay } from "../utils/getCurrentDay";
import { observeCurrentDay } from "../utils/observeCurrentDay";
import { currentDayContext } from "./currentDayContext";

interface CurrentDayProviderProps {
	children: React.ReactNode;
}

export function CurrentDayProvider({ children }: CurrentDayProviderProps): React.JSX.Element {
	const { timeService, forcedDayRepository } = useGameContext();
	const [currentDay, setCurrentDay] = useState<string>(() => getCurrentDay(timeService, forcedDayRepository));

	useEffect(() => {
		const subscription = observeCurrentDay(timeService, forcedDayRepository).subscribe((day: string) => {
			setCurrentDay(day);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [forcedDayRepository, timeService]);

	return <currentDayContext.Provider value={currentDay}>{children}</currentDayContext.Provider>;
}
