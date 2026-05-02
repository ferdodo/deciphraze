import type React from "react";
import padlock from '../assets/padlock.svg';
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
			<div 
				className={styles.letterBox}
				style={{
					background: isUnlocked 
						? 'linear-gradient(135deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.16))'
						: `linear-gradient(to top, rgba(131, 173, 255, 0.51) ${Math.round(safePercentage)}%, #ccc0 ${Math.round(safePercentage)}%), linear-gradient(135deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.16))`
				}}
			>
				{isUnlocked ? letter.toUpperCase() : <img src={padlock} alt="Locked" className={styles.lockedIcon} />}
			</div>
		</div>
	);
}
