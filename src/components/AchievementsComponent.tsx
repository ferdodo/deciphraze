import type React from "react";
import { useAchievements } from "../hooks/useAchievements";
import styles from "./AchievementsComponent.module.css";

export const AchievementsComponent: React.FC = () => {
	const achievements = useAchievements();

	return (
		<div className={styles.achievementsContainer}>
			<h3 className={styles.title}>🏆 Succès</h3>
			<div className={styles.achievementsList}>
				{/* Premier pas */}
				<div 
					key={achievements.firstGame.achievementId} 
					className={`${styles.achievement} ${achievements.firstGame.unlocked ? styles.unlocked : styles.locked}`}
				>
					<div className={styles.achievementIcon}>
						{achievements.firstGame.unlocked ? "🏆" : "🔒"}
					</div>
					<div className={styles.achievementContent}>
						<div className={styles.achievementName}>{achievements.firstGame.name}</div>
						<div className={styles.achievementDescription}>
							{achievements.firstGame.description}
						</div>
					</div>
				</div>

				{/* Série de 5 jours */}
				<div 
					key={achievements.streak5Days.achievementId} 
					className={`${styles.achievement} ${achievements.streak5Days.unlocked ? styles.unlocked : styles.locked}`}
				>
					<div className={styles.achievementIcon}>
						{achievements.streak5Days.unlocked ? "🏆" : "🔒"}
					</div>
					<div className={styles.achievementContent}>
						<div className={styles.achievementName}>{achievements.streak5Days.name}</div>
						<div className={styles.achievementDescription}>
							{achievements.streak5Days.description}
						</div>
						{!achievements.streak5Days.unlocked && achievements.streak5Days.progress.current > 0 && (
							<div className={styles.progressContainer}>
								<div className={styles.progressBar}>
									<div 
										className={styles.progressFill}
										style={{ width: `${(achievements.streak5Days.progress.current / achievements.streak5Days.progress.target) * 100}%` }}
									></div>
								</div>
								<div className={styles.progressText}>
									{achievements.streak5Days.progress.current}/{achievements.streak5Days.progress.target} jours
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
