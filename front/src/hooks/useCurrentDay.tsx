import { useState, useEffect } from "react";
import { useGameContext } from "./useGameContext";

export const useCurrentDay = (): string => {
	const { dayRepository } = useGameContext();
	const [currentDay, setCurrentDay] = useState<string>(dayRepository.getDay());

	useEffect(() => {
		const subscription = dayRepository.observeDay().subscribe((day: string) => {
			setCurrentDay(day);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [dayRepository]);

	return currentDay;
};
