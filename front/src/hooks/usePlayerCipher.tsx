import { useState, useEffect } from "react";
import { useGameContext } from "./useGameContext";
import { useCurrentDay } from "./useCurrentDay";
import type { PlayerCipher } from "../entities/PlayerCipher";
import { getPlayerCipherFromAllGames } from "../utils/getPlayerCipherFromAllGames";

export const usePlayerCipher = (): PlayerCipher => {
	const { allGamesRepository } = useGameContext();
	const currentDay = useCurrentDay();
	const allGames = allGamesRepository.get();
	const [playerCipherMap, setPlayerCipherMap] = useState<PlayerCipher>(getPlayerCipherFromAllGames(allGames, currentDay));

	useEffect(() => {
		const subscription = allGamesRepository.subscribe().subscribe(() => {
			const updatedAllGames = allGamesRepository.get();
			setPlayerCipherMap(getPlayerCipherFromAllGames(updatedAllGames, currentDay));
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [allGamesRepository, currentDay]);

	return playerCipherMap;
};