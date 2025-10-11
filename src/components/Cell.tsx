import { getEncodedCharacter } from "../utils/getEncodedCharacter";
import { useCipher } from "../hooks/useCipher";
import type { CellType } from "../types/CellType";
import type { Cipher } from "../types/Cipher";
import styles from "./Cell.module.css";

interface CellProps {
	type: CellType;
	highlighted: boolean;
	selected: boolean;
	character: string;
	matched: boolean;
}

export function Cell({ type, highlighted, selected, character, matched }: CellProps) {
	const cipher: Cipher = useCipher();
	const encoded = getEncodedCharacter(character, cipher);

	const letterClassName = [
		selected ? styles.selected : "",
		highlighted ? styles.highlighted : "",
		matched ? styles.matched : "",
	].join(" ");

	const symbolClassName = [
		styles.symbols,
		selected ? styles.selected : "",
		highlighted ? styles.highlighted : "",
		matched ? styles.matched : "",
	].join(" ");

	return (
		<div className={styles.cell}>
			{type === "letter" ? (
				<span className={letterClassName}> {character} </span>
			) : (
				<span className={symbolClassName}> {encoded} </span>
			)}
		</div>
	);
};
