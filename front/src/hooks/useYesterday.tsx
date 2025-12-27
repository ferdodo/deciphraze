import { useMemo } from "react";
import { useDay } from "./useDay";
import { computeYesterday } from "../utils/computeYesterday";

export const useYesterday = (): string => {
	const currentDay = useDay();
	
	const yesterday = useMemo(() => {
		return computeYesterday(currentDay);
	}, [currentDay]);

	return yesterday;
};

