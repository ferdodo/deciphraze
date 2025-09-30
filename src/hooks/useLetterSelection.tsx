import { useState, useEffect } from "react";
import { useGameContext } from "../contexts/useGameContext";

export const useLetterSelection = () => {
	const { letterSelection } = useGameContext();
	const [letterSelected, setLetterSelected] = useState<string | null>(null);

	useEffect(() => {
		const subscription = letterSelection.letterSelection$.subscribe((value) => {
			setLetterSelected(value);
		});

		return () => subscription.unsubscribe();
	}, [letterSelection]);

	return {
		letterSelected,
		letterSelection,
	};
};
