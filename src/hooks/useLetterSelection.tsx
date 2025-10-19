import { useState, useEffect } from "react";
import { useGameContext } from "../contexts/useGameContext";
import type { LetterSelection } from "../types/LetterSelection";

export const useLetterSelection = (): LetterSelection => {
	const { letterSelectionRepository } = useGameContext();
	const [selectedLetter, setSelectedLetter] = useState<LetterSelection>(letterSelectionRepository.getLetterSelection());

	useEffect(() => {
		const subscription = letterSelectionRepository.letterSelection$.subscribe((value: LetterSelection) => {
			setSelectedLetter(value);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [letterSelectionRepository]);

	return selectedLetter;
};