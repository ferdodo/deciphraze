import { useSanitizedCharacter } from "../hooks/useSanitizedCharacter";
import { useCellMatchesCurrentSelection } from "../hooks/useCellMatchesCurrentSelection";
import styles from "./FragmentComponent.module.css";
import { computeCellType } from "../utils/computeCellType";
import { usePlayerCipher } from "../hooks/usePlayerCipher";
import { normalizeWord } from "../utils/normalizeWord";
import { useCipher } from "../hooks/useCipher";
import { getEncodedCharacter } from "../utils/getEncodedCharacter";
import { isDev } from "../utils/isDev";

interface FragmentComponentProps {
	character: string;
}

export function FragmentComponent({ character }: FragmentComponentProps): JSX.Element {
	const playerCipher = usePlayerCipher();
	const cellType = computeCellType(character, playerCipher);
	const sanitizedCharacter = useSanitizedCharacter(character);
	const matchesCurrentSelection = useCellMatchesCurrentSelection(character);
	const cipher = useCipher();

	const displayCharacter = cellType === "letter" 
		? sanitizedCharacter
		: isDev()
			? normalizeWord(character).toUpperCase()
			: getEncodedCharacter(character, cipher);

	return (
		<span className={`${styles.fragment} ${matchesCurrentSelection ? styles.matched : ""}`}>
			{cellType === "letter" ? (
				<span className={styles.letter}>{displayCharacter}</span>
			) : (
				<span className={`${styles.symbol} ${styles.symbols}`}>{displayCharacter}</span>
			)}
		</span>
	);
};
