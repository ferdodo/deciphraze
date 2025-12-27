import { useGameContext } from "./useGameContext";
import type { SymbolSelectionRepository } from "../repositories/SymbolSelectionRepository";

export const useSymbolSelectionRepository = (): SymbolSelectionRepository => {
	const { symbolSelectionRepository } = useGameContext();
	return symbolSelectionRepository;
};