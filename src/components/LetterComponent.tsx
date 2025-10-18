import type { PlayerCipher } from "../types/PlayerCipher";
import type { LetterSelection } from "../types/LetterSelection";
import { usePlayerCipher } from "../hooks/usePlayerCipher";
import { useLetterSelection } from "../hooks/useLetterSelection";
import { usePlayerCipherRepository } from "../hooks/usePlayerCipherRepository";
import { useLetterSelectionRepository } from "../hooks/useLetterSelectionRepository";
import { useSymbolSelection } from "../hooks/useSymbolSelection";
import { useSymbolSelectionRepository } from "../hooks/useSymbolSelectionRepository";
import { selectLetter } from "../usecases/selectLetter";
import { normalizeWord } from "../utils/normalizeWord";
import { characterEquals } from "../utils/characterEquals";
import { isLetterMatched } from "../utils/isLetterMatched";
import styles from "./LetterComponent.module.css";

interface LetterComponentProps {
	character: string;
}

export function LetterComponent({ character }: LetterComponentProps): JSX.Element {
	const playerCipher: PlayerCipher = usePlayerCipher();
	const selectedLetter: LetterSelection = useLetterSelection();
	const playerCipherRepository = usePlayerCipherRepository();
	const letterSelectionRepository = useLetterSelectionRepository();
	const selectedSymbol = useSymbolSelection();
	const symbolSelectionRepository = useSymbolSelectionRepository();
	const normalizedCharacter = normalizeWord(character).toUpperCase();
	const highlighted = normalizedCharacter in playerCipher;
	const selected = characterEquals(selectedLetter ?? '', character);
	const matched = isLetterMatched(character, selectedLetter, selectedSymbol, playerCipher);

    const spanClassName = [
		selected ? styles.selected : "",
		highlighted ? styles.highlighted : "",
		matched ? styles.matched : "",
	].join(" ");
	
	const clickSelectLetter = (): void => {
		selectLetter(character, letterSelectionRepository, symbolSelectionRepository, playerCipherRepository);
	};

	return (
		<button
			className={styles.inputs}
			onClick={clickSelectLetter}
			type="button">
			<div className={styles.letterContainer}>
				<span className={spanClassName}>
					{character}
				</span>
			</div>
		</button>
	);
};
