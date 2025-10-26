import { useState, useEffect } from "react";
import { isWin } from "../utils/isWin";
import { useGameContext } from "../contexts/useGameContext";

export const useWin = (): boolean => {
	const { playerCipherRepository, paragraphOfTheDayRepository } = useGameContext();
	const paragraphOfTheDay = paragraphOfTheDayRepository.getParagraphOfTheDay();
	const [win, setWin] = useState(false);

	useEffect(() => {
		const playerCipherSubscription = playerCipherRepository.playerCipher$.subscribe(
			(playerCipher) => {
				setWin(isWin(playerCipher, paragraphOfTheDay));
			},
		);

		return () => {
			playerCipherSubscription.unsubscribe();
		};
	}, [playerCipherRepository, paragraphOfTheDay]);

	return win;
};
