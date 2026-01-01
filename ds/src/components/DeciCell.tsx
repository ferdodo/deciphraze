import React from "react";
import styles from "./DeciCell.module.css";

interface DeciCellProps {
	encoded: string;
	type: "letter" | "symbol";
	highlighted: boolean;
	selected: boolean;
	character: string;
	matched: boolean;
}

export function DeciCell({ type, highlighted, selected, character, matched, encoded }: DeciCellProps): React.JSX.Element {
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

