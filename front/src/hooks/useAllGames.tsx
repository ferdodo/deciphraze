import { useState, useEffect } from "react";
import { useGameContext } from "./useGameContext";
import type { AllGames } from "../entities/AllGames";

export const useAllGames = (): AllGames => {
	const { allGamesRepository } = useGameContext();
	const [allGames, setAllGames] = useState<AllGames>(() => allGamesRepository.get());

	useEffect(() => {
		const subscription = allGamesRepository.subscribe().subscribe(() => {
			setAllGames(allGamesRepository.get());
		});

		return () => subscription.unsubscribe();
	}, [allGamesRepository]);

	return allGames;
};
