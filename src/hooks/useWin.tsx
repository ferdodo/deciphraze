import { useState, useEffect } from "react";
import { usePlayerCipherRepository } from "./usePlayerCipherRepository";
import { letterFound } from "../utils/letterFound";
import { paragraphOfTheDay } from "../paragraphOfTheDay";

export const useWin = (): boolean => {
	const playerCipherRepository = usePlayerCipherRepository();
	const [win, setWin] = useState(false);

	useEffect(() => {
		const playerCipherSubscription = playerCipherRepository.playerCipher$.subscribe(
			() => {
				if (
					[...paragraphOfTheDay].every((letter) =>
						letterFound(letter, playerCipherRepository),
					)
				) {
					setWin(true);
				}
			},
		);

		return () => {
			playerCipherSubscription.unsubscribe();
		};
	}, [playerCipherRepository]);

	return win;
};
