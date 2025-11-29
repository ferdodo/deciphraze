import { useGameContext } from "./useGameContext";
import type { PlayerCipherRepository } from "../repositories/PlayerCipherRepository";

export const usePlayerCipherRepository = (): PlayerCipherRepository => {
	const { playerCipherRepository } = useGameContext();
	return playerCipherRepository;
};