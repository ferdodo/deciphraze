import type { ReactNode } from "react";
import styles from "./DeciAchievements.module.css";

interface Achievement {
    achievementId: string;
    name: string;
    description: string;
    unlocked: boolean;
    progress?: {
        current: number;
        target: number;
    };
}

interface DeciAchievementProps {
    achievement: Achievement;
    currentStreak: number;
}

export function DeciAchievement({
    achievement,
    currentStreak,
}: DeciAchievementProps): ReactNode {

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

