import { useGameContext } from "./useGameContext";
import type { LetterSelectionRepository } from "../repositories/LetterSelectionRepository";

export const useLetterSelectionRepository = (): LetterSelectionRepository => {
	const { letterSelectionRepository } = useGameContext();
	return letterSelectionRepository;
};