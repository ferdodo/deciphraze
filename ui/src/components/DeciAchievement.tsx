import padlock from '../assets/padlock.svg';
import trophy from '../assets/trophy.svg';
import type { ReactNode } from "react";
import styles from "./DeciAchievement.module.css";

interface Achievement {
    name: "Préambule" | "Momentum" | "Aperçu" | "Élémentaire" | "Mythique" | "Signature" | "Synthèse" | "Qualifié" | "Scribe" | "Lettré" | "Paléographe" | "Vocaliste";
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
    isNew?: boolean;
}

export function DeciAchievement({
    achievement,
    currentStreak,
    isNew = false,
}: DeciAchievementProps): ReactNode {

	return  (
        <div 
            className={`${styles.achievement} ${achievement.unlocked ? styles.unlocked : styles.locked}`}
            style={{ position: "relative" }}
        >
            <div className={styles.achievementIcon}>
                {achievement.unlocked ? <img src={trophy} alt="Trophy" className={styles.trophyIcon} /> : <img src={padlock} alt="Padlock" className={styles.padlockIcon} />}
            </div>
            <div className={styles.achievementContent}>
                <div className={styles.achievementName}>
                    <div style={{ display: "inline-block", position: "relative" }}>
                        {isNew && <crumbs-new-content-indicator />}
                        <span>{achievement.name}</span>
                    </div>
                </div>
                <div className={styles.achievementDescription}>
                    {achievement.description}
                </div>
                {!achievement.unlocked && "progress" in achievement && achievement.progress && (
                    achievement.name === "Momentum" ? (
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
                                        achievement.name === "Scribe" ? "mots" :
                                        achievement.name === "Lettré" ? "lettres" : ""
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

