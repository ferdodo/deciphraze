import { useGameContext } from "./useGameContext";
import type { AllGamesRepository } from "../repositories/AllGamesRepository";

export const useSymbolSelectionRepository = (): AllGamesRepository => {
	const { allGamesRepository } = useGameContext();
	return allGamesRepository;
};