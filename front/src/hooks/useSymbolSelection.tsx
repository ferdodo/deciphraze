import { useState, useEffect } from "react";
import { useGameContext } from "./useGameContext";
import { useCurrentDay } from "./useCurrentDay";
import type { SymbolSelection } from "@deciphraze/core";
import { getSymbolSelectionFromAllGames } from "../utils/getSymbolSelectionFromAllGames";

export const useSymbolSelection = (): SymbolSelection => {
	const { allGamesRepository } = useGameContext();
	const currentDay = useCurrentDay();
	const allGames = allGamesRepository.get();
	const [selectedSymbol, setSelectedSymbol] = useState<SymbolSelection>(getSymbolSelectionFromAllGames(allGames, currentDay));

	useEffect(() => {
		const subscription = allGamesRepository.subscribe().subscribe(() => {
			const updatedAllGames = allGamesRepository.get();
			setSelectedSymbol(getSymbolSelectionFromAllGames(updatedAllGames, currentDay));
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [allGamesRepository, currentDay]);

	return selectedSymbol;
};
