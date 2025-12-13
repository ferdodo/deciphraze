import { useMemo } from "react";
import { useDay } from "./useDay";
import { getParagraphOfTheDay } from "../utils/getParagraphOfTheDay";

export const useParagraphOfTheDay = (): string => {
	const currentDay = useDay();
	
	const paragraphOfTheDay = useMemo(() => {
		return getParagraphOfTheDay(currentDay);
	}, [currentDay]);
	
	return paragraphOfTheDay;
};

