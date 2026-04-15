import type React from "react";
import { useMemo } from "react";
import { useGameDay } from "../hooks/useGameDay";
import { generateParagraph } from "../utils/generateParagraph";
import { paragraphOfTheDayContext } from "./paragraphOfTheDayContext";

interface ParagraphOfTheDayProviderProps {
	children: React.ReactNode;
}

export function ParagraphOfTheDayProvider({
	children,
}: ParagraphOfTheDayProviderProps): React.JSX.Element {
	const gameDay = useGameDay();

	const paragraphOfTheDay = useMemo(() => {
		return generateParagraph(gameDay);
	}, [gameDay]);

	return (
		<paragraphOfTheDayContext.Provider value={paragraphOfTheDay}>
			{children}
		</paragraphOfTheDayContext.Provider>
	);
}
