import { useGameContext } from "./useGameContext";
import type { AllGamesRepository } from "../repositories/AllGamesRepository";

export const usePlayerCipherRepository = (): AllGamesRepository => {
	const { allGamesRepository } = useGameContext();
	return allGamesRepository;
};