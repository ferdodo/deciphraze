import { useState, useEffect } from "react";
import { useGameContext } from "./useGameContext";
import type { SymbolSelection } from "../entities/SymbolSelection";

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