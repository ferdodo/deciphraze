import type React from "react";
import styles from "./DeciVirtualKeyboard.module.css";
import { DeciText } from "./DeciText";

interface DeciVirtualKeyboardProps {
	value: string;
	onKeyboardInput: (char: string) => void;
	onKeyboardSubmit: () => void;
}

export function DeciVirtualKeyboard({
	value,
	onKeyboardInput,
	onKeyboardSubmit
}: DeciVirtualKeyboardProps): React.JSX.Element {
	const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789".split("");

	function onKeyPress(key: string): void {
		onKeyboardInput(value + key);
	}

	function onErase(): void {
		onKeyboardInput(value.substring(0, value.length - 1))
	}

	return (
		<div className={styles.keyboard}>
			<div className={styles.display}>{value}</div>
			<div className={styles.grid}>
				{alphabet.map((char) => (
					<button
						key={char}
						className={styles.key}
						onClick={() => onKeyPress(char.toLowerCase())}
						type="button"
					>
						<DeciText variant="command">
							{char}
						</DeciText>
					</button>
				))}
			</div>
			<div className={styles.controls}>
				<crumbs-button
					onClick={onErase}
					type="button">
					<DeciText variant="command">
						Effacer
					</DeciText>
				</crumbs-button>
				<crumbs-button
					onClick={() => onKeyboardSubmit()}
					type="button">
					<DeciText variant="command">
						Soumettre
					</DeciText>
				</crumbs-button>
			</div>
		</div>
	);
}
