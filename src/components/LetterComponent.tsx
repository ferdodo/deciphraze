import type { PlayerCipher } from "../types/PlayerCipher";
import type { LetterSelection } from "../types/LetterSelection";
import { usePlayerCipher } from "../hooks/usePlayerCipher";
import { useLetterSelection } from "../hooks/useLetterSelection";
import { usePlayerCipherService } from "../hooks/usePlayerCipherService";
import { useLetterSelectionService } from "../hooks/useLetterSelectionService";
import { useSymbolSelection } from "../hooks/useSymbolSelection";
import { useSymbolSelectionService } from "../hooks/useSymbolSelectionService";
import { selectLetter } from "../usecases/selectLetter";
import { normalizeWord } from "../utils/normalizeWord";
import { characterEquals } from "../utils/characterEquals";
import { isLetterMatched } from "../utils/isLetterMatched";
import styles from "./LetterComponent.module.css";

interface LetterComponentProps {
	character: string;
}

export function LetterComponent({ character }: LetterComponentProps) {
	const playerCipher: PlayerCipher = usePlayerCipher();
	const selectedLetter: LetterSelection = useLetterSelection();
	const playerCipherService = usePlayerCipherService();
	const letterSelection = useLetterSelectionService();
	const selectedSymbol = useSymbolSelection();
	const symbolSelection = useSymbolSelectionService();
	const normalizedCharacter = normalizeWord(character).toUpperCase();
	const highlighted = playerCipher.has(normalizedCharacter);
	const selected = characterEquals(selectedLetter ?? '', character);
	const matched = isLetterMatched(character, selectedLetter, selectedSymbol, playerCipher);

    const spanClassName = [
		selected ? styles.selected : "",
		highlighted ? styles.highlighted : "",
		matched ? styles.matched : "",
	].join(" ");
	
	const clickSelectLetter = () => {
		selectLetter(character, letterSelection, symbolSelection, playerCipherService);
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
