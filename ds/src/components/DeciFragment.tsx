import React from "react";
import styles from "./DeciFragment.module.css";

interface DeciFragmentProps {
	cellType: "letter" | "symbol";
	displayCharacter: string;
	matchesCurrentSelection: boolean;
}

export function DeciFragment({ cellType, displayCharacter, matchesCurrentSelection }: DeciFragmentProps): React.JSX.Element {
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

