import React from "react";
import styles from "./DeciSymbol.module.css";

interface DeciSymbolProps {
	displayCharacter: string;
	selected: boolean;
	highlighted: boolean;
	matched: boolean;
	onClickSelectSymbol: () => void;
	win: boolean;
}

export function DeciSymbol({
	displayCharacter,
	selected,
	highlighted,
	matched,
	onClickSelectSymbol,
	win,
}: DeciSymbolProps): React.JSX.Element {
	const spanClassName = [
		styles.symbols,
		selected ? styles.selected : "",
		highlighted ? styles.highlighted : "",
		matched ? styles.matched : "",
		win ? styles.gameWon : "",
	].join(" ");

	return (
		<button
			className={styles.inputs}
			onClick={onClickSelectSymbol}
			type="button"
			disabled={win}
		>
			<div className={styles.symbolContainer}>
				<span className={spanClassName}>
					{displayCharacter}
				</span>
			</div>
		</button>
	);
};

