import { useState, useEffect } from "react";
import { useLetterSelection } from "./useLetterSelection";
import { useSymbolSelection } from "./useSymbolSelection";
import { useSanitizedCharacter } from "./useSanitizedCharacter";
import { usePlayerCipher } from "./usePlayerCipher";
import { computeCellType } from "../utils/computeCellType";
import { characterEquals } from "../utils/characterEquals";

export const useCellMatchesCurrentSelection = (character: string): boolean => {
	const selectedLetter = useLetterSelection();
	const selectedSymbol = useSymbolSelection();
	const playerCipher = usePlayerCipher();
	const cellType = computeCellType(character, playerCipher);
	const sanitizedCharacter = useSanitizedCharacter(character);
	const [matched, setMatched] = useState(false);

	useEffect(() => {
		setMatched(false);

		if (cellType === "letter") {
			if (selectedLetter !== null) {
				setMatched(characterEquals(sanitizedCharacter, selectedLetter));
			}
		} else if (cellType === "symbol") {
			if (selectedSymbol !== null) {
				setMatched(characterEquals(character, selectedSymbol));
			}
		}
	}, [cellType, selectedLetter, selectedSymbol, character, sanitizedCharacter]);

	return matched;
};
