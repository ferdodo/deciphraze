import { useState, useEffect } from "react";
import { useGameContext } from "../contexts/useGameContext";

export const usePlayerCipher = () => {
	const { playerCipher } = useGameContext();
	const [playerCipherMap, setPlayerCipherMap] = useState<Map<string, string>>(
		new Map(),
	);

	useEffect(() => {
		const subscription = playerCipher.playerCipher$.subscribe((value) => {
			setPlayerCipherMap(value);
		});

		return () => subscription.unsubscribe();
	}, [playerCipher]);

	return {
		playerCipherMap,
		playerCipher,
	};
};
