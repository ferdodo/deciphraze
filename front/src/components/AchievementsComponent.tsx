import type React from "react";
import { useMemo } from "react";
import { useAchievements } from "../hooks/useAchievements";
import { useAchievementsAsList } from "../hooks/useAchievementsAsList";
import styles from "./AchievementsComponent.module.css";
import { AchievementComponent } from "./AchievementComponent";

export const AchievementsComponent: React.FC = () => {
	const achievements = useAchievements();

	// Calculer le nombre de succès débloqués
	const unlockedCount = useMemo(() => {
		return Object.values(achievements.achievements).filter(achievement => achievement.unlocked).length;
	}, [achievements]);

	const TOTAL_ACHIEVEMENTS = 12;

	// Créer un tableau d'achievements pour faciliter l'affichage
	const achievementsList = useAchievementsAsList();

	return (
		<div className={styles.achievementsContainer}>
			<div className={styles.achievementsList}>
				{achievementsList.map((achievement) => (
					<AchievementComponent key={achievement.achievementId} achievement={achievement} />
				))}
			</div>
			<div className={styles.achievementsCounter}>
				{unlockedCount}/{TOTAL_ACHIEVEMENTS} succès débloqués
			</div>
		</div>
	);
};
