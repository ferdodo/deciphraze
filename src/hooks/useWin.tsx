import { useState, useEffect } from "react";
import { usePlayerCipherRepository } from "./usePlayerCipherRepository";
import { isWin } from "../utils/isWin";
import { paragraphOfTheDay } from "../paragraphOfTheDay";

export const useWin = (): boolean => {
	const playerCipherRepository = usePlayerCipherRepository();
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
	}, [playerCipherRepository]);

	return win;
};
