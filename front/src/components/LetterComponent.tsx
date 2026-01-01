import type { PlayerCipher } from "../entities/PlayerCipher";
import type { LetterSelection } from "../entities/LetterSelection";
import { usePlayerCipher } from "../hooks/usePlayerCipher";
import { useLetterSelection } from "../hooks/useLetterSelection";
import { useSymbolSelection } from "../hooks/useSymbolSelection";
import { useWin } from "../hooks/useWin";
import { selectLetter } from "../usecases/selectLetter";
import { normalizeWord } from "../utils/normalizeWord";
import { characterEquals } from "../utils/characterEquals";
import { isLetterMatched } from "../utils/isLetterMatched";
import { useGameContext } from "../hooks/useGameContext";
import { DeciLetter } from "@deciphraze/ds";

interface LetterComponentProps {
	character: string;
}

import React from "react";

export function LetterComponent({ character }: LetterComponentProps): React.JSX.Element {
	const playerCipher: PlayerCipher = usePlayerCipher();
	const selectedLetter: LetterSelection = useLetterSelection();
	const selectedSymbol = useSymbolSelection();
	const context = useGameContext();
	const win = useWin();
	const normalizedCharacter = normalizeWord(character).toUpperCase();
	const highlighted = normalizedCharacter in playerCipher;
	const selected = characterEquals(selectedLetter ?? '', character);
	const matched = isLetterMatched(character, selectedLetter, selectedSymbol, playerCipher);
	
	const clickSelectLetter = (): void => {
		selectLetter(character, context);
	};

	return (
		<DeciLetter
			character={character}
			matched={matched}
			selected={selected}
			highlighted={highlighted}
			win={win}
			onClickSelectLetter={clickSelectLetter}
		/>
	);
};
