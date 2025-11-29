import type React from "react";
import { useAchievements } from "../hooks/useAchievements";
import styles from "./AchievementsComponent.module.css";

export const AchievementsComponent: React.FC = () => {
	const achievements = useAchievements();

	return (
		<div className={styles.achievementsContainer}>
			<h3 className={styles.title}>🏆 Succès</h3>
			<div className={styles.achievementsList}>
				{/* Preambule */}
				<div 
					key={achievements.achievements.firstGame.achievementId} 
					className={`${styles.achievement} ${achievements.achievements.firstGame.unlocked ? styles.unlocked : styles.locked}`}
				>
					<div className={styles.achievementIcon}>
						{achievements.achievements.firstGame.unlocked ? "🏆" : "🔒"}
					</div>
					<div className={styles.achievementContent}>
						<div className={styles.achievementName}>{achievements.achievements.firstGame.name}</div>
						<div className={styles.achievementDescription}>
							{achievements.achievements.firstGame.description}
						</div>
					</div>
				</div>

				{/* Série de 5 jours */}
				<div 
					key={achievements.achievements.streak5Days.achievementId} 
					className={`${styles.achievement} ${achievements.achievements.streak5Days.unlocked ? styles.unlocked : styles.locked}`}
				>
					<div className={styles.achievementIcon}>
						{achievements.achievements.streak5Days.unlocked ? "🏆" : "🔒"}
					</div>
					<div className={styles.achievementContent}>
						<div className={styles.achievementName}>{achievements.achievements.streak5Days.name}</div>
						<div className={styles.achievementDescription}>
							{achievements.achievements.streak5Days.description}
						</div>
						{!achievements.achievements.streak5Days.unlocked && achievements.achievements.streak5Days.progress.current > 0 && (
							<div className={styles.progressContainer}>
								<div className={styles.progressBar}>
									<div 
										className={styles.progressFill}
										style={{ width: `${(achievements.achievements.streak5Days.progress.current / achievements.achievements.streak5Days.progress.target) * 100}%` }}
									></div>
								</div>
								<div className={styles.progressText}>
									{achievements.achievements.streak5Days.progress.current}/{achievements.achievements.streak5Days.progress.target} jours
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Commencer par A */}
				<div 
					key={achievements.achievements.firstLetterA.achievementId} 
					className={`${styles.achievement} ${achievements.achievements.firstLetterA.unlocked ? styles.unlocked : styles.locked}`}
				>
					<div className={styles.achievementIcon}>
						{achievements.achievements.firstLetterA.unlocked ? "🏆" : "🔒"}
					</div>
					<div className={styles.achievementContent}>
						<div className={styles.achievementName}>{achievements.achievements.firstLetterA.name}</div>
						<div className={styles.achievementDescription}>
							{achievements.achievements.firstLetterA.description}
						</div>
					</div>
				</div>

				{/* Commencer par E */}
				<div 
					key={achievements.achievements.firstLetterE.achievementId} 
					className={`${styles.achievement} ${achievements.achievements.firstLetterE.unlocked ? styles.unlocked : styles.locked}`}
				>
					<div className={styles.achievementIcon}>
						{achievements.achievements.firstLetterE.unlocked ? "🏆" : "🔒"}
					</div>
					<div className={styles.achievementContent}>
						<div className={styles.achievementName}>{achievements.achievements.firstLetterE.name}</div>
						<div className={styles.achievementDescription}>
							{achievements.achievements.firstLetterE.description}
						</div>
					</div>
				</div>

				{/* Commencer par Y */}
				<div 
					key={achievements.achievements.firstLetterY.achievementId} 
					className={`${styles.achievement} ${achievements.achievements.firstLetterY.unlocked ? styles.unlocked : styles.locked}`}
				>
					<div className={styles.achievementIcon}>
						{achievements.achievements.firstLetterY.unlocked ? "🏆" : "🔒"}
					</div>
					<div className={styles.achievementContent}>
						<div className={styles.achievementName}>{achievements.achievements.firstLetterY.name}</div>
						<div className={styles.achievementDescription}>
							{achievements.achievements.firstLetterY.description}
						</div>
					</div>
				</div>

				{/* Commencer par Q */}
				<div 
					key={achievements.achievements.firstLetterQ.achievementId} 
					className={`${styles.achievement} ${achievements.achievements.firstLetterQ.unlocked ? styles.unlocked : styles.locked}`}
				>
					<div className={styles.achievementIcon}>
						{achievements.achievements.firstLetterQ.unlocked ? "🏆" : "🔒"}
					</div>
					<div className={styles.achievementContent}>
						<div className={styles.achievementName}>{achievements.achievements.firstLetterQ.name}</div>
						<div className={styles.achievementDescription}>
							{achievements.achievements.firstLetterQ.description}
						</div>
					</div>
				</div>

				{/* Signature */}
				<div 
					key={achievements.achievements.wordInOrder.achievementId} 
					className={`${styles.achievement} ${achievements.achievements.wordInOrder.unlocked ? styles.unlocked : styles.locked}`}
				>
					<div className={styles.achievementIcon}>
						{achievements.achievements.wordInOrder.unlocked ? "🏆" : "🔒"}
					</div>
					<div className={styles.achievementContent}>
						<div className={styles.achievementName}>{achievements.achievements.wordInOrder.name}</div>
						<div className={styles.achievementDescription}>
							{achievements.achievements.wordInOrder.description}
						</div>
					</div>
				</div>

				{/* Synthèse */}
				<div 
					key={achievements.achievements.alphaAndOmega.achievementId} 
					className={`${styles.achievement} ${achievements.achievements.alphaAndOmega.unlocked ? styles.unlocked : styles.locked}`}
				>
					<div className={styles.achievementIcon}>
						{achievements.achievements.alphaAndOmega.unlocked ? "🏆" : "🔒"}
					</div>
					<div className={styles.achievementContent}>
						<div className={styles.achievementName}>{achievements.achievements.alphaAndOmega.name}</div>
						<div className={styles.achievementDescription}>
							{achievements.achievements.alphaAndOmega.description}
						</div>
					</div>
				</div>

				{/* Mille mots */}
				<div 
					key={achievements.achievements.words1000.achievementId} 
					className={`${styles.achievement} ${achievements.achievements.words1000.unlocked ? styles.unlocked : styles.locked}`}
				>
					<div className={styles.achievementIcon}>
						{achievements.achievements.words1000.unlocked ? "🏆" : "🔒"}
					</div>
					<div className={styles.achievementContent}>
						<div className={styles.achievementName}>{achievements.achievements.words1000.name}</div>
						<div className={styles.achievementDescription}>
							{achievements.achievements.words1000.description}
						</div>
						{!achievements.achievements.words1000.unlocked && achievements.achievements.words1000.progress.current > 0 && (
							<div className={styles.progressContainer}>
								<div className={styles.progressBar}>
									<div 
										className={styles.progressFill}
										style={{ width: `${(achievements.achievements.words1000.progress.current / achievements.achievements.words1000.progress.target) * 100}%` }}
									></div>
								</div>
								<div className={styles.progressText}>
									{achievements.achievements.words1000.progress.current}/{achievements.achievements.words1000.progress.target} mots
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Alphabet complet */}
				<div 
					key={achievements.achievements.completeAlphabet.achievementId} 
					className={`${styles.achievement} ${achievements.achievements.completeAlphabet.unlocked ? styles.unlocked : styles.locked}`}
				>
					<div className={styles.achievementIcon}>
						{achievements.achievements.completeAlphabet.unlocked ? "🏆" : "🔒"}
					</div>
					<div className={styles.achievementContent}>
						<div className={styles.achievementName}>{achievements.achievements.completeAlphabet.name}</div>
						<div className={styles.achievementDescription}>
							{achievements.achievements.completeAlphabet.description}
						</div>
						{!achievements.achievements.completeAlphabet.unlocked && achievements.achievements.completeAlphabet.progress.current > 0 && (
							<div className={styles.progressContainer}>
								<div className={styles.progressBar}>
									<div 
										className={styles.progressFill}
										style={{ width: `${(achievements.achievements.completeAlphabet.progress.current / achievements.achievements.completeAlphabet.progress.target) * 100}%` }}
									></div>
								</div>
								<div className={styles.progressText}>
									{achievements.achievements.completeAlphabet.progress.current}/{achievements.achievements.completeAlphabet.progress.target} lettres
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
