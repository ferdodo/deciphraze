import { useState, useEffect } from "react";
import { usePlayerCipherRepository } from "./usePlayerCipherRepository";
import { letterFound } from "../utils/letterFound";
import { paragraphOfTheDay } from "../paragraphOfTheDay";

export const useWin = (): boolean => {
	const playerCipherRepository = usePlayerCipherRepository();
	const [win, setWin] = useState(false);

	useEffect(() => {
		const playerCipherSubscription = playerCipherRepository.playerCipher$.subscribe(
			(playerCipher) => {
				if (
					[...paragraphOfTheDay].every((letter) =>
						letterFound(letter, playerCipher),
					)
				) {
					setWin(true);
				} else {
					setWin(false);
				}
			},
		);

		return () => {
			playerCipherSubscription.unsubscribe();
		};
	}, [playerCipherRepository]);

	return win;
};
