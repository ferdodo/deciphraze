import { useState, useEffect } from "react";
import { useGameContext } from "./useGameContext";
import { useCurrentDay } from "./useCurrentDay";
import type { LetterSelection } from "../entities/LetterSelection";
import { getLetterSelectionFromAllGames } from "../utils/getLetterSelectionFromAllGames";

export const useLetterSelection = (): LetterSelection => {
	const { allGamesRepository } = useGameContext();
	const currentDay = useCurrentDay();
	const allGames = allGamesRepository.get();
	const [selectedLetter, setSelectedLetter] = useState<LetterSelection>(getLetterSelectionFromAllGames(allGames, currentDay));

	useEffect(() => {
		const subscription = allGamesRepository.subscribe().subscribe(() => {
			const updatedAllGames = allGamesRepository.get();
			setSelectedLetter(getLetterSelectionFromAllGames(updatedAllGames, currentDay));
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [allGamesRepository, currentDay]);

	return selectedLetter;
};