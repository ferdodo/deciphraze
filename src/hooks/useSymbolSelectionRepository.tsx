import { useGameContext } from "../contexts/useGameContext";
import type { SymbolSelectionRepository } from "../types/SymbolSelectionRepository";

export const useSymbolSelectionRepository = (): SymbolSelectionRepository => {
	const { symbolSelectionRepository } = useGameContext();
	return symbolSelectionRepository;
};