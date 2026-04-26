import type React from "react";
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
					<div
						key={`letter-${index}-${letter}`}
						className={styles.letterItem}
					>
						<div className={styles.letterBox}>{letter.toUpperCase()}</div>
						<div className={styles.progressBar}>
							<div
								className={styles.progressFill}
								style={{
									width: `${Math.round(letterPercentages[index])}%`,
								}}
							/>
						</div>
						<span className={styles.percentageText}>
							{Math.round(letterPercentages[index])}%
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
