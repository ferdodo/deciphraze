import { useState, useEffect } from "react";
import { isWin } from "../utils/isWin";
import { useGameContext } from "./useGameContext";

export const useWin = (): boolean => {
	const { playerCipherRepository, paragraphOfTheDayRepository, gameHistoryRepository, dayRepository } = useGameContext();
	const paragraphOfTheDay = paragraphOfTheDayRepository.getParagraphOfTheDay();
	const currentDay = dayRepository.getDay();
	
	// Vérifier l'état initial
	const initialPlayerCipher = playerCipherRepository.getPlayerCipher();
	const initialGameHistory = gameHistoryRepository.getHistory();
	const [win, setWin] = useState(() => 
		isWin(initialPlayerCipher, paragraphOfTheDay, initialGameHistory, currentDay)
	);

	useEffect(() => {
		const playerCipherSubscription = playerCipherRepository.playerCipher$.subscribe(
			(playerCipher) => {
				const gameHistory = gameHistoryRepository.getHistory();
				setWin(isWin(playerCipher, paragraphOfTheDay, gameHistory, currentDay));
			},
		);

		return () => {
			playerCipherSubscription.unsubscribe();
		};
	}, [playerCipherRepository, paragraphOfTheDay, gameHistoryRepository, currentDay]);

	return win;
};
