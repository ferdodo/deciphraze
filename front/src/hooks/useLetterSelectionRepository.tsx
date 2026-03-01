import { useGameContext } from "./useGameContext";
import type { AllGamesRepository } from "../repositories/AllGamesRepository";

export const useLetterSelectionRepository = (): AllGamesRepository => {
	const { allGamesRepository } = useGameContext();
	return allGamesRepository;
};