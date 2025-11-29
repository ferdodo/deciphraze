import { useState, useEffect } from "react";
import { useGameContext } from "./useGameContext";
import type { PlayerCipher } from "../types/PlayerCipher";

export const usePlayerCipher = (): PlayerCipher => {
	const { playerCipherRepository } = useGameContext();
	const [playerCipherMap, setPlayerCipherMap] = useState<PlayerCipher>(playerCipherRepository.getPlayerCipher());

	useEffect(() => {
		const subscription = playerCipherRepository.playerCipher$.subscribe((value: PlayerCipher) => {
			setPlayerCipherMap(value);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [playerCipherRepository]);

	return playerCipherMap;
};