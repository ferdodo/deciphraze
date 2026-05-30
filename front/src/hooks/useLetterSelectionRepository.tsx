import { useGameContext } from "./useGameContext";
import type { AllGamesRepository } from "@deciphraze/core";

export const useLetterSelectionRepository = (): AllGamesRepository => {
	const { allGamesRepository } = useGameContext();
	return allGamesRepository;
};
