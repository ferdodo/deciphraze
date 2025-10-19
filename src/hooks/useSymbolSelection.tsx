import { useState, useEffect } from "react";
import { useGameContext } from "../contexts/useGameContext";
import type { SymbolSelection } from "../types/SymbolSelection";

export const useSymbolSelection = (): SymbolSelection => {
	const { symbolSelectionRepository } = useGameContext();
	const [selectedSymbol, setSelectedSymbol] = useState<SymbolSelection>(symbolSelectionRepository.getSymbolSelection());

	useEffect(() => {
		const subscription = symbolSelectionRepository.symbolSelection$.subscribe((value: SymbolSelection) => {
			setSelectedSymbol(value);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [symbolSelectionRepository]);

	return selectedSymbol;
};