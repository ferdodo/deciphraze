import type React from "react";
import { DeciLetterItem } from "./DeciLetterItem";
import styles from "./DeciLetterDisplay.module.css";

interface DeciLetterDisplayProps {
	word: string;
	letter1Percentage: number;
	letter2Percentage: number;
	letter3Percentage: number;
	letter4Percentage: number;
	letter5Percentage: number;
	letter6Percentage: number;
	letter7Percentage: number;
}

export function DeciLetterDisplay({
	word,
	letter1Percentage,
	letter2Percentage,
	letter3Percentage,
	letter4Percentage,
	letter5Percentage,
	letter6Percentage,
	letter7Percentage,
}: DeciLetterDisplayProps): React.JSX.Element {
	const letterPercentages = [
		letter1Percentage,
		letter2Percentage,
		letter3Percentage,
		letter4Percentage,
		letter5Percentage,
		letter6Percentage,
		letter7Percentage,
	];

	return (
		<div className={styles.container}>
			<div className={styles.lettersGrid}>
				{word.split("").map((letter, index) => (
					<DeciLetterItem
						key={`letter-${index}-${letter}`}
						letter={letter}
						percentage={letterPercentages[index]}
					/>
				))}
			</div>
		</div>
	);
}
