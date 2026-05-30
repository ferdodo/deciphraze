import { useGameContext } from "./useGameContext";
import type { AllGamesRepository } from "@deciphraze/core";

export const useSymbolSelectionRepository = (): AllGamesRepository => {
	const { allGamesRepository } = useGameContext();
	return allGamesRepository;
};
