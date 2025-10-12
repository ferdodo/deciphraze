import { useGameContext } from "../contexts/useGameContext";
import type { LetterSelectionRepository } from "../types/LetterSelectionRepository";

export const useLetterSelectionRepository = (): LetterSelectionRepository => {
	const { letterSelectionRepository } = useGameContext();
	return letterSelectionRepository;
};