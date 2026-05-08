import type React from "react";
import padlock from '../assets/padlock.svg';
import { DeciLetterDisplay } from "./DeciLetterDisplay";
import styles from "./DeciChallengeMenu.module.css";
import { DeciText } from "./DeciText";

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
	onShowCode: () => void;
	displayedCode: string | null;
	onUnlockLetter: () => void;
	wordInput: string;
	onWordInputChange: (value: string) => void;
	onSubmitWord: () => void;
	codesRequiredPerLetter: number;
	word: string;
	isTodayGameCompleted: boolean;
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
	onShowCode,
	displayedCode,
	onUnlockLetter,
	wordInput,
	onWordInputChange,
	onSubmitWord,
	codesRequiredPerLetter,
	word,
	isTodayGameCompleted,
}: DeciChallengeMenuProps): React.JSX.Element {
	if (isLocked) {
		return (
			<div className={styles.container}>
				<div className={styles.lockedMessage}>
					<h2><img src={padlock} alt="Locked" className={styles.lockedTitle} /> Challenge</h2>
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
		<div>
			<DeciText variant="sectionTitle">Niveau {levelBadge}</DeciText>

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

			{!displayedCode && isTodayGameCompleted && (
				<crumbs-button
					type="button"
					onClick={onShowCode}
					role="button"
				>
					Afficher Code du Jour
				</crumbs-button>
			)}
			{displayedCode && (
				<div style={{ marginTop: "1rem", padding: "1rem" }}>
					<DeciText> Code du jour: </DeciText>
					<code style={{ display: "block", margin: 0, fontFamily: "monospace", fontSize: "1.25rem", fontWeight: "bold", userSelect: "text", cursor: "text" }}>
						{displayedCode}
					</code>
				</div>
			)}
			{!displayedCode && !isTodayGameCompleted && (
				<DeciText variant="muted">Complétez la partie du jour à ce niveau pour afficher un code</DeciText>
			)}

			<DeciText variant="sectionTitle">Déverrouiller une lettre:</DeciText>
			<div className={styles.inputGroup}>
				<crumbs-input
					value={codeInput}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						onCodeInputChange(e.target.value)
					}
					placeholder="Collez le code généré"
				/>
				<crumbs-button
					onClick={onUnlockLetter}
				>
					Valider
				</crumbs-button>
			</div>
			<DeciText variant="muted">À ce niveau, chaque lettre nécessite {codesRequiredPerLetter} code(s)</DeciText>

			<DeciText variant="sectionTitle">Trouvez le mot de 7 lettres:</DeciText>
			<div className={styles.inputGroup}>
				<crumbs-input
					value={wordInput}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						onWordInputChange(e.target.value.toUpperCase())
					}
				/>
				<crumbs-button onClick={onSubmitWord} >
					Soumettre
				</crumbs-button>
			</div>
		</div>
	);
}
