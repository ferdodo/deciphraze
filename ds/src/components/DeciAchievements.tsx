import React from "react";
import styles from "./DeciAchievements.module.css";
import { DeciAchievement } from "./DeciAchievement";

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

interface DeciAchievementsProps {
	achievementsList: Achievement[];
	unlockedCount: number;
	currentStreak: number;
}

export function DeciAchievements({
	achievementsList,
	unlockedCount,
	currentStreak,
}: DeciAchievementsProps): React.JSX.Element {
	const TOTAL_ACHIEVEMENTS = 12;

	return (
		<div className={styles.achievementsContainer}>
			<div className={styles.achievementsList}>
				{achievementsList.map((achievement) => (
					<DeciAchievement key={achievement.achievementId} achievement={achievement} currentStreak={currentStreak} />
				))}
			</div>
			<div className={styles.achievementsCounter}>
				{unlockedCount}/{TOTAL_ACHIEVEMENTS} succès débloqués
			</div>
		</div>
	);
};

