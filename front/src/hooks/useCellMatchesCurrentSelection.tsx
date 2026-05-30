import { useLetterSelection } from "./useLetterSelection";
import { useSymbolSelection } from "./useSymbolSelection";
import { useSanitizedCharacter } from "./useSanitizedCharacter";
import { usePlayerCipher } from "./usePlayerCipher";
import { useWin } from "./useWin";
import { computeCellType } from "../utils/computeCellType";
import { computeCellMatchesCurrentSelection } from "../utils/computeCellMatchesCurrentSelection";

export const useCellMatchesCurrentSelection = (character: string): boolean => {
	const selectedLetter = useLetterSelection();
	const selectedSymbol = useSymbolSelection();
	const playerCipher = usePlayerCipher();
	const isWin = useWin();
	const cellType = computeCellType(character, playerCipher, isWin);
	const sanitizedCharacter = useSanitizedCharacter(character);

	return computeCellMatchesCurrentSelection(
		character,
		playerCipher,
		selectedLetter,
		selectedSymbol,
		cellType,
		sanitizedCharacter
	);
};
