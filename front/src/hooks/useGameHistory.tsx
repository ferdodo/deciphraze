import { useState, useEffect } from "react";
import { useGameContext } from "./useGameContext";
import type { GameHistory } from "@deciphraze/core";

export const useGameHistory = (): GameHistory => {
	const { gameHistoryRepository } = useGameContext();
	const [gameHistory, setGameHistory] = useState<GameHistory>(gameHistoryRepository.getHistory());

	useEffect(() => {
		const subscription = gameHistoryRepository.gameHistory$.subscribe((value: GameHistory) => {
			setGameHistory(value);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [gameHistoryRepository]);

	return gameHistory;
};

