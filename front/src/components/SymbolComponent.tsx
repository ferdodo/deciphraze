import type { PlayerCipher } from "../entities/PlayerCipher";
import type { LetterSelection } from "../entities/LetterSelection";
import { DeciSymbol } from "@deciphraze/ds";
import { usePlayerCipher } from "../hooks/usePlayerCipher";
import { useLetterSelection } from "../hooks/useLetterSelection";
import { useWin } from "../hooks/useWin";
import { selectSymbol } from "../usecases/selectSymbol";
import { normalizeWord } from "../utils/normalizeWord";
import { characterEquals } from "../utils/characterEquals";
import { isSymbolMatched } from "../utils/isSymbolMatched";
import { useSymbolSelection } from "../hooks/useSymbolSelection";
import { useGameContext } from "../hooks/useGameContext";
import { useCipher } from "../hooks/useCipher";
import { getEncodedCharacter } from "../utils/getEncodedCharacter";
import { isDev } from "../utils/isDev";

interface SymbolComponentProps {
	character: string;
}

export function SymbolComponent({ character }: SymbolComponentProps): JSX.Element {
	const playerCipherMap: PlayerCipher = usePlayerCipher();
	const selectedLetter: LetterSelection = useLetterSelection();
	const selectedSymbol = useSymbolSelection();
	const context = useGameContext();
	const win = useWin();
	const cipher = useCipher();
	const normalizedCharacter = normalizeWord(character).toUpperCase();
	const matched = isSymbolMatched(character, selectedLetter, playerCipherMap);
    const highlighted = Object.values(playerCipherMap).includes(normalizedCharacter);
	const selected = characterEquals(selectedSymbol ?? '', character);

	const displayCharacter = isDev()
		? character.toUpperCase()
		: getEncodedCharacter(character, cipher);

	const clickSelectSymbol = (): void => {
		selectSymbol(character, context);
	};

	return (
		<DeciSymbol
			displayCharacter={displayCharacter}
			selected={selected}
			highlighted={highlighted}
			matched={matched}
			onClickSelectSymbol={clickSelectSymbol}
			win={win}
		/>
	);
};
