import { useContext } from "react";
import { paragraphOfTheDayContext } from "../contexts/paragraphOfTheDayContext";

export const useParagraphOfTheDay = (): string => {
	return useContext(paragraphOfTheDayContext);
};
