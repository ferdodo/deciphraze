import { useGameContext } from "../contexts/useGameContext";
import type { Cipher } from "../types/Cipher";

export const useCipher = (): Cipher => {
	const { cipherRepository } = useGameContext();
	return cipherRepository.getCipher();
};
