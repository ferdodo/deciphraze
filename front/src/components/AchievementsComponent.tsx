import React, { useMemo } from "react";
import { DeciAchievements } from "@deciphraze/ds";
import { useAchievements } from "../hooks/useAchievements";
import { useAchievementsAsList } from "../hooks/useAchievementsAsList";
import { useCurrentStreak } from "../hooks/useCurrentStreak";

export function AchievementsComponent(): React.JSX.Element {
	const achievements = useAchievements();
	const achievementsList = useAchievementsAsList();
	const currentStreak = useCurrentStreak();

	// Calculer le nombre de succès débloqués
	const unlockedCount = useMemo(() => {
		return Object.values(achievements.achievements).filter(achievement => achievement.unlocked).length;
	}, [achievements]);

	return (
		<DeciAchievements
			achievementsList={achievementsList}
			unlockedCount={unlockedCount}
			currentStreak={currentStreak}
		/>
	);
};
