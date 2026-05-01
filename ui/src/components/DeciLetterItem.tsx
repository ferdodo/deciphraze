import type React from "react";
import styles from "./DeciLetterItem.module.css";

interface DeciLetterItemProps {
	letter: string;
	percentage: number;
}

export function DeciLetterItem({ letter, percentage }: DeciLetterItemProps): React.JSX.Element {
	const safePercentage = percentage ?? 0;
	const isUnlocked = safePercentage === 100;

	return (
		<div className={styles.letterItem}>
			<div className={styles.letterBox}>
				{isUnlocked ? letter.toUpperCase() : "🔒"}
			</div>
			<div className={styles.progressBar}>
				<div
					className={styles.progressFill}
					style={{
						width: `${Math.round(safePercentage)}%`,
					}}
				/>
			</div>
			<span className={styles.percentageText}>
				{Math.round(safePercentage)}%
			</span>
		</div>
	);
}
