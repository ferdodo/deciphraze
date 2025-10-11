import { useGameContext } from "../contexts/useGameContext";
import type { SymbolSelectionRepository } from "../types/SymbolSelectionRepository";

export const useSymbolSelectionService = (): SymbolSelectionRepository => {
	const { symbolSelectionRepository } = useGameContext();
	return symbolSelectionRepository;
};