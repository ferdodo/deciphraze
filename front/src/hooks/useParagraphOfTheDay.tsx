import { useMemo } from "react";
import { useDay } from "./useDay";
import { generateParagraph } from "../utils/generateParagraph";

export const useParagraphOfTheDay = (): string => {
	const currentDay = useDay();
	
	const paragraphOfTheDay = useMemo(() => {
		return generateParagraph(currentDay);
	}, [currentDay]);
	
	return paragraphOfTheDay;
};

