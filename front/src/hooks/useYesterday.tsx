import { useMemo } from "react";
import { useCurrentDay } from "./useCurrentDay";
import { computeYesterday } from "../utils/computeYesterday";

export const useYesterday = (): string => {
	const currentDay = useCurrentDay();
	
	const yesterday = useMemo(() => {
		return computeYesterday(currentDay);
	}, [currentDay]);

	return yesterday;
};
