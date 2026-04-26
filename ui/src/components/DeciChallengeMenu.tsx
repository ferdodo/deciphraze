import type React from "react";
import { DeciLetterDisplay } from "./DeciLetterDisplay";
import styles from "./DeciChallengeMenu.module.css";

interface DeciChallengeMenuProps {
	levelBadge: number;
	letter1Percentage: number;
	letter2Percentage: number;
	letter3Percentage: number;
	letter4Percentage: number;
	letter5Percentage: number;
	letter6Percentage: number;
	letter7Percentage: number;
	isLocked: boolean;
	codeInput: string;
	onCodeInputChange: (value: string) => void;
	onGenerateCode: () => void;
	onUnlockLetter: () => void;
	wordInput: string;
	onWordInputChange: (value: string) => void;
	onSubmitWord: () => void;
	codesRequiredPerLetter: number;
	word: string;
}

export function DeciChallengeMenu({
	levelBadge,
	letter1Percentage,
	letter2Percentage,
	letter3Percentage,
	letter4Percentage,
	letter5Percentage,
	letter6Percentage,
	letter7Percentage,
	isLocked,
	codeInput,
	onCodeInputChange,
	onGenerateCode,
	onUnlockLetter,
	wordInput,
	onWordInputChange,
	onSubmitWord,
	codesRequiredPerLetter,
	word,
}: DeciChallengeMenuProps): React.JSX.Element {
	if (isLocked) {
		return (
			<div className={styles.container}>
				<div className={styles.lockedMessage}>
					<h2>Challenge Mode 🔒</h2>
					<p>
						Débloquez tous les succès pour accéder au Challenge Mode. Une fois
						le Platine obtenu, vous pourrez trouver des mots de 7 lettres en
						progressant niveau après niveau.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Challenge Mode</h1>
				<div className={styles.levelBadge}>Niveau {levelBadge}</div>
			</div>

			{/* Letter Progress Display */}
			<div className={styles.letterProgressSection}>
				<div className={styles.letterProgressLabel}>Lettres:</div>
				<DeciLetterDisplay
					word={word}
					letter1Percentage={letter1Percentage}
					letter2Percentage={letter2Percentage}
					letter3Percentage={letter3Percentage}
					letter4Percentage={letter4Percentage}
					letter5Percentage={letter5Percentage}
					letter6Percentage={letter6Percentage}
					letter7Percentage={letter7Percentage}
				/>
			</div>

			{/* Generate Code Button */}
			<div className={styles.section}>
				<button
					type="button"
					onClick={onGenerateCode}
					className={styles.buttonPrimary}
				>
					Générer Code du Jour
				</button>
				<p className={styles.hint}>
					Complétez la partie du jour à ce niveau pour générer un code
				</p>
			</div>

			{/* Unlock Letter */}
			<div className={styles.section}>
				<label htmlFor="codeInput">Déverrouiller une lettre:</label>
				<div className={styles.inputGroup}>
					<input
						id="codeInput"
						type="text"
						value={codeInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							onCodeInputChange(e.target.value)
						}
						placeholder="Collez le code généré"
						className={styles.input}
					/>
					<button
						type="button"
						onClick={onUnlockLetter}
						className={styles.buttonSecondary}
					>
						Valider
					</button>
				</div>
				<p className={styles.hint}>
					À ce niveau, chaque lettre nécessite {codesRequiredPerLetter} code(s)
				</p>
			</div>

			{/* Submit Word */}
			<div className={styles.section}>
				<label htmlFor="wordInput">Trouvez le mot de 7 lettres:</label>
				<div className={styles.inputGroup}>
					<input
						id="wordInput"
						type="text"
						value={wordInput}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							onWordInputChange(e.target.value.toUpperCase())
						}
						placeholder="Entrez votre réponse"
						maxLength={7}
						className={styles.input}
					/>
					<button
						type="button"
						onClick={onSubmitWord}
						className={styles.buttonPrimary}
					>
						Soumettre
					</button>
				</div>
			</div>
		</div>
	);
}
