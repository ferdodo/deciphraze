import { useGameContext } from "../contexts/useGameContext";
import type { LetterSelectionRepository } from "../types/LetterSelectionRepository";

export const useLetterSelectionService = (): LetterSelectionRepository => {
	const { letterSelectionRepository } = useGameContext();
	return letterSelectionRepository;
};