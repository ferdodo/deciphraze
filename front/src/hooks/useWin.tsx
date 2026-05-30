import { useMemo } from "react";
import { isWin } from "../utils/isWin";
import { useParagraphOfTheDay } from "./useParagraphOfTheDay";
import { useCurrentDay } from "./useCurrentDay";
import { usePlayerCipher } from "./usePlayerCipher";
import { useGameHistory } from "./useGameHistory";

export const useWin = (): boolean => {
	const paragraphOfTheDay = useParagraphOfTheDay();
	const currentDay = useCurrentDay();
	const playerCipher = usePlayerCipher();
	const gameHistory = useGameHistory();

	const win = useMemo(() => {
		return isWin(playerCipher, paragraphOfTheDay, gameHistory, currentDay);
	}, [playerCipher, paragraphOfTheDay, gameHistory, currentDay]);

	return win;
};
