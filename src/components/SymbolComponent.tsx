import type { PlayerCipher } from "../types/PlayerCipher";
import type { LetterSelection } from "../types/LetterSelection";
import { usePlayerCipher } from "../hooks/usePlayerCipher";
import { useLetterSelection } from "../hooks/useLetterSelection";
import { usePlayerCipherRepository } from "../hooks/usePlayerCipherRepository";
import { useLetterSelectionRepository } from "../hooks/useLetterSelectionRepository";
import { useSymbolSelectionRepository } from "../hooks/useSymbolSelectionRepository";
import { selectSymbol } from "../usecases/selectSymbol";
import { normalizeWord } from "../utils/normalizeWord";
import { characterEquals } from "../utils/characterEquals";
import { isSymbolMatched } from "../utils/isSymbolMatched";
import styles from "./SymbolComponent.module.css";
import { useSymbolSelection } from "../hooks/useSymbolSelection";

interface SymbolComponentProps {
	character: string;
}

export function SymbolComponent({ character }: SymbolComponentProps): JSX.Element {
	const playerCipherMap: PlayerCipher = usePlayerCipher();
	const selectedLetter: LetterSelection = useLetterSelection();
	const playerCipherRepository = usePlayerCipherRepository();
	const letterSelectionRepository = useLetterSelectionRepository();
	const symbolSelectionRepository = useSymbolSelectionRepository();
	const selectedSymbol = useSymbolSelection();
	const normalizedCharacter = normalizeWord(character).toUpperCase();
	const matched = isSymbolMatched(character, selectedLetter, playerCipherMap);
    const highlighted = Object.values(playerCipherMap).includes(normalizedCharacter);
	const selected = characterEquals(selectedSymbol ?? '', character);

	const spanClassName = [
		styles.symbols,
		selected ? styles.selected : "",
		highlighted ? styles.highlighted : "",
		matched ? styles.matched : "",
	].join(" ");

	const clickSelectSymbol = (): void => {
		selectSymbol(character, {
			letterSelectionRepository,
			symbolSelectionRepository,
			playerCipherRepository,
		});
	};

	return (
		<button
			className={styles.inputs}
			onClick={clickSelectSymbol}
			type="button"
		>
			<div className={styles.symbolContainer}>
				<span className={spanClassName}>
					{character.toUpperCase()}
				</span>
			</div>
		</button>
	);
};
