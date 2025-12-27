import type React from "react";
import { useCurrentStreak } from "../hooks/useCurrentStreak";
import styles from "./AchievementsComponent.module.css";
import type { AllAchievements } from "../entities/AllAchievements";

type AchievementType = AllAchievements["achievements"][keyof AllAchievements["achievements"]];

export const AchievementComponent: React.FC<{ achievement: AchievementType }> = ({ achievement }: { achievement: AchievementType }) => {
	const currentStreak = useCurrentStreak();

	return  (
        <div 
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
	);
};
