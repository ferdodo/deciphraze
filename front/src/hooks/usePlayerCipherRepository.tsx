import { useGameContext } from "./useGameContext";
import type { AllGamesRepository } from "@deciphraze/core";

export const usePlayerCipherRepository = (): AllGamesRepository => {
	const { allGamesRepository } = useGameContext();
	return allGamesRepository;
};
