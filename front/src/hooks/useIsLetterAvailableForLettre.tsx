import { useMemo } from "react";
import { useParagraphOfTheDay } from "./useParagraphOfTheDay";
import { useGameHistory } from "./useGameHistory";
import { isLetterAvailableForLettre } from "../utils/isLetterAvailableForLettre";

export function useIsLetterAvailableForLettre(): boolean {
	const paragraphOfTheDay = useParagraphOfTheDay();
	const gameHistory = useGameHistory();

	return useMemo(
		() => isLetterAvailableForLettre(paragraphOfTheDay, gameHistory),
		[paragraphOfTheDay, gameHistory]
	);
}
