import { useSanitizedCharacter } from "../hooks/useSanitizedCharacter";
import { useCellMatchesCurrentSelection } from "../hooks/useCellMatchesCurrentSelection";
import styles from "./FragmentComponent.module.css";
import { computeCellType } from "../utils/computeCellType";
import { usePlayerCipher } from "../hooks/usePlayerCipher";

interface FragmentComponentProps {
	character: string;
}

export function FragmentComponent({ character }: FragmentComponentProps): JSX.Element {
	const playerCipher = usePlayerCipher();
	const cellType = computeCellType(character, playerCipher);
	const sanitizedCharacter = useSanitizedCharacter(character);
	const matchesCurrentSelection = useCellMatchesCurrentSelection(character);

	return (
		<span className={`${styles.fragment} ${matchesCurrentSelection ? styles.matched : ""}`}>
			{cellType === "letter" ? (
				<span className={styles.letter}>{sanitizedCharacter}</span>
			) : (
				<span className={`${styles.symbol} ${styles.symbols}`}>{character.toUpperCase()}</span>
			)}
		</span>
	);
};
