import { useMemo } from "react";
import { useGameDay } from "./useGameDay";
import { generateParagraph } from "../utils/generateParagraph";

export const useParagraphOfTheDay = (): string => {
	const gameDay = useGameDay();
	
	const paragraphOfTheDay = useMemo(() => {
		return generateParagraph(gameDay);
	}, [gameDay]);
	
	return paragraphOfTheDay;
};

