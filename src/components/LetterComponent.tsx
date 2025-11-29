import type { PlayerCipher } from "../types/PlayerCipher";
import type { LetterSelection } from "../types/LetterSelection";
import { usePlayerCipher } from "../hooks/usePlayerCipher";
import { useLetterSelection } from "../hooks/useLetterSelection";
import { useSymbolSelection } from "../hooks/useSymbolSelection";
import { useWin } from "../hooks/useWin";
import { selectLetter } from "../usecases/selectLetter";
import { normalizeWord } from "../utils/normalizeWord";
import { characterEquals } from "../utils/characterEquals";
import { isLetterMatched } from "../utils/isLetterMatched";
import styles from "./LetterComponent.module.css";
import { useGameContext } from "../hooks/useGameContext";

interface LetterComponentProps {
	character: string;
}

export function LetterComponent({ character }: LetterComponentProps): JSX.Element {
	const playerCipher: PlayerCipher = usePlayerCipher();
	const selectedLetter: LetterSelection = useLetterSelection();
	const selectedSymbol = useSymbolSelection();
	const context = useGameContext();
	const win = useWin();
	const normalizedCharacter = normalizeWord(character).toUpperCase();
	const highlighted = normalizedCharacter in playerCipher;
	const selected = characterEquals(selectedLetter ?? '', character);
	const matched = isLetterMatched(character, selectedLetter, selectedSymbol, playerCipher);

    const spanClassName = [
		selected ? styles.selected : "",
		highlighted ? styles.highlighted : "",
		matched ? styles.matched : "",
		win ? styles.gameWon : "",
	].join(" ");
	
	const clickSelectLetter = (): void => {
		selectLetter(character, context);
	};

	return (
		<button
			className={styles.inputs}
			onClick={clickSelectLetter}
			type="button"
			disabled={win}>
			<div className={styles.letterContainer}>
				<span className={spanClassName}>
					{character}
				</span>
			</div>
		</button>
	);
};
