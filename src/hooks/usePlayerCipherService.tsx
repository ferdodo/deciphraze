import { useGameContext } from "../contexts/useGameContext";
import type { PlayerCipherRepository } from "../types/PlayerCipherRepository";

export const usePlayerCipherService = (): PlayerCipherRepository => {
	const { playerCipherRepository } = useGameContext();
	return playerCipherRepository;
};