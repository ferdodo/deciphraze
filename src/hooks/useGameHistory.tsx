import { useState, useEffect } from "react";
import { useGameContext } from "../contexts/useGameContext";
import type { GameHistory } from "../types/GameHistory";

interface UseGameHistoryResult {
	gameHistory: GameHistory;
	gameHistoryService: import("../types/GameHistoryService").GameHistoryService;
}

export const useGameHistory = (): UseGameHistoryResult => {
	const { gameHistory } = useGameContext();
	const [gameHistoryMap, setGameHistoryMap] = useState<GameHistory>(
		gameHistory.getGameHistory(),
	);

	useEffect(() => {
		const subscription = gameHistory.gameHistory$.subscribe((history) => {
			setGameHistoryMap(history);
		});
		return () => subscription.unsubscribe();
	}, [gameHistory]);

	return { gameHistory: gameHistoryMap, gameHistoryService: gameHistory };
};
