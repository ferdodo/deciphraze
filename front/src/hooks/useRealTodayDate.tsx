import { useEffect, useState } from "react";
import { useGameContext } from "./useGameContext";

export const useRealTodayDate = (): string => {
	const { timeService } = useGameContext();
	const [realTodayDate, setRealTodayDate] = useState<string>(timeService.getRealDay().toString());

	useEffect(() => {
		return timeService.observeRealDay((realDay) => {
			setRealTodayDate(realDay.toString());
		});
	}, [timeService]);

	return realTodayDate;
};
