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

	const letters = word.split("").map((letter, index) => ({
		key: `${word}-${index}`,
		letter,
		percentage: letterPercentages[index],
	}));

	return (
		<div className={styles.container}>
			<div className={styles.lettersGrid}>
				{letters.map(({ key, letter, percentage }) => (
					<DeciLetterItem
						key={key}
						letter={letter}
						percentage={percentage}
					/>
				))}
			</div>
		</div>
	);
}
