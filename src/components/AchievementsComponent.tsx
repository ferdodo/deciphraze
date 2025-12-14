import type React from "react";
import { useMemo } from "react";
import { useAchievements } from "../hooks/useAchievements";
import { useCurrentStreak } from "../hooks/useCurrentStreak";
import styles from "./AchievementsComponent.module.css";

export const AchievementsComponent: React.FC = () => {
	const achievements = useAchievements();
	const currentStreak = useCurrentStreak();

	// Calculer le nombre de succès débloqués
	const unlockedCount = useMemo(() => {
		return Object.values(achievements.achievements).filter(achievement => achievement.unlocked).length;
	}, [achievements]);

	const TOTAL_ACHIEVEMENTS = 11;

	// Créer un tableau d'achievements pour faciliter l'affichage
	const achievementsList = useMemo(() => [
		achievements.achievements.firstGame,
		achievements.achievements.streak5Days,
		achievements.achievements.firstLetterA,
		achievements.achievements.firstLetterE,
		achievements.achievements.firstLetterY,
		achievements.achievements.firstLetterQ,
		achievements.achievements.wordInOrder,
		achievements.achievements.alphaAndOmega,
		achievements.achievements.words1000,
		achievements.achievements.completeAlphabet,
		achievements.achievements.paleographer,
	], [achievements]);

	return (
		<div className={styles.achievementsContainer}>
			<div className={styles.achievementsList}>
				{achievementsList.map((achievement) => (
					<div 
						key={achievement.achievementId} 
						className={`${styles.achievement} ${achievement.unlocked ? styles.unlocked : styles.locked}`}
					>
						<div className={styles.achievementIcon}>
							{achievement.unlocked ? "🏆" : "🔒"}
						</div>
						<div className={styles.achievementContent}>
							<div className={styles.achievementName}>{achievement.name}</div>
							<div className={styles.achievementDescription}>
								{achievement.description}
							</div>
							{!achievement.unlocked && "progress" in achievement && achievement.progress && (
								achievement.achievementId === "streak_5_days" ? (
									currentStreak > 0 && (
										<div className={styles.progressContainer}>
											<div className={styles.progressBar}>
												<div 
													className={styles.progressFill}
													style={{ width: `${(currentStreak / achievement.progress.target) * 100}%` }}
												></div>
											</div>
											<div className={styles.progressText}>
												{currentStreak}/{achievement.progress.target} jours
											</div>
										</div>
									)
								) : (
									achievement.progress.current > 0 && (
										<div className={styles.progressContainer}>
											<div className={styles.progressBar}>
												<div 
													className={styles.progressFill}
													style={{ width: `${(achievement.progress.current / achievement.progress.target) * 100}%` }}
												></div>
											</div>
											<div className={styles.progressText}>
												{achievement.progress.current}/{achievement.progress.target} {
													achievement.achievementId === "words_1000" ? "mots" :
													achievement.achievementId === "complete_alphabet" ? "lettres" : ""
												}
											</div>
										</div>
									)
								)
							)}
						</div>
					</div>
				))}
			</div>
			<div className={styles.achievementsCounter}>
				{unlockedCount}/{TOTAL_ACHIEVEMENTS} succès débloqués
			</div>
		</div>
	);
};
