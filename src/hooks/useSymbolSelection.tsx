import { useState, useEffect } from "react";
import { useGameContext } from "../contexts/useGameContext";

export const useSymbolSelection = () => {
	const { symbolSelection } = useGameContext();
	const [symbolSelected, setSymbolSelected] = useState<string | null>(null);

	useEffect(() => {
		const subscription = symbolSelection.symbolSelection$.subscribe((value) => {
			setSymbolSelected(value);
		});

		return () => subscription.unsubscribe();
	}, [symbolSelection]);

	return {
		symbolSelected,
		symbolSelection,
	};
};
