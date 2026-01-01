import React from "react";
import styles from "./DeciLetter.module.css";

interface DeciLetterProps {
	character: string;
	matched: boolean;
	selected: boolean;
	highlighted: boolean;
	win: boolean;
	onClickSelectLetter: () => void;
}

export function DeciLetter({ character, matched, selected, highlighted, win, onClickSelectLetter }: DeciLetterProps): React.JSX.Element {
    const spanClassName = [
		selected ? styles.selected : "",
		highlighted ? styles.highlighted : "",
		matched ? styles.matched : "",
		win ? styles.gameWon : "",
	].join(" ");
	

	return (
		<button
			className={styles.inputs}
			onClick={onClickSelectLetter}
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

