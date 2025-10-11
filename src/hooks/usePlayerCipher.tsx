import { useState, useEffect } from "react";
import { useGameContext } from "../contexts/useGameContext";
import type { PlayerCipher } from "../types/PlayerCipher";

export const usePlayerCipher = (): PlayerCipher => {
	const { playerCipherRepository } = useGameContext();
	const [playerCipherMap, setPlayerCipherMap] = useState<PlayerCipher>(new Map());

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