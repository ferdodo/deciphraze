import type { PlayerCipher } from "../types/PlayerCipher";
import type { LetterSelection } from "../types/LetterSelection";
import { usePlayerCipher } from "../hooks/usePlayerCipher";
import { useLetterSelection } from "../hooks/useLetterSelection";
import { usePlayerCipherService } from "../hooks/usePlayerCipherService";
import { useLetterSelectionService } from "../hooks/useLetterSelectionService";
import { useSymbolSelectionService } from "../hooks/useSymbolSelectionService";
import { selectSymbol } from "../usecases/selectSymbol";
import { normalizeWord } from "../utils/normalizeWord";
import { characterEquals } from "../utils/characterEquals";
import { isSymbolMatched } from "../utils/isSymbolMatched";
import styles from "./SymbolComponent.module.css";
import { useSymbolSelection } from "../hooks/useSymbolSelection";

interface SymbolComponentProps {
	character: string;
}

export function SymbolComponent({ character }: SymbolComponentProps) {
	const playerCipherMap: PlayerCipher = usePlayerCipher();
	const selectedLetter: LetterSelection = useLetterSelection();
	const playerCipherService = usePlayerCipherService();
	const letterSelection = useLetterSelectionService();
	const symbolSelection = useSymbolSelectionService();
	const selectedSymbol = useSymbolSelection();
	const normalizedCharacter = normalizeWord(character).toUpperCase();
	const matched = isSymbolMatched(character, selectedLetter, playerCipherMap);
    const highlighted = [...playerCipherMap.values()].includes(normalizedCharacter);
	const selected = characterEquals(selectedSymbol ?? '', character);

	const spanClassName = [
		styles.symbols,
		selected ? styles.selected : "",
		highlighted ? styles.highlighted : "",
		matched ? styles.matched : "",
	].join(" ");

	const clickSelectSymbol = () => {
		selectSymbol(
			character,
			letterSelection,
			symbolSelection,
			playerCipherService,
		);
	};

	return (
		<button
			className={styles.inputs}
			onClick={clickSelectSymbol}
			type="button"
		>
			<div className={styles.symbolContainer}>
				<span className={spanClassName}>
					{character}
				</span>
			</div>
		</button>
	);
};
