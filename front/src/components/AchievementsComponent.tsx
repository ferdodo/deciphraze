import type React from "react";
import { useMemo } from "react";
import { DeciAchievements } from "@deciphraze/ui";
import { useAchievements } from "../hooks/useAchievements";
import { useCurrentStreak } from "../hooks/useCurrentStreak";
import { useNewAchievementIds } from "../hooks/useNewAchievementIds";
import { useGameContext } from "../hooks/useGameContext";
import { markAchievementsAsViewed } from "../usecases/markAchievementsAsViewed";

export function AchievementsComponent(): React.JSX.Element {
	const achievements = useAchievements();
	const currentStreak = useCurrentStreak();
	const newAchievementIds = useNewAchievementIds();
	const { viewedAchievementsRepository } = useGameContext();

	// Calculer le nombre de succès débloqués
	const unlockedCount = useMemo(() => {
		return Object.values(achievements.achievements).filter(achievement => achievement.unlocked).length;
	}, [achievements]);

	// Handler pour marquer tous les achievements comme vus
	const handleMarkAllAsViewed = (): void => {
		markAchievementsAsViewed(newAchievementIds, viewedAchievementsRepository);
	};

	return (
		<DeciAchievements
			achievements={achievements}
			unlockedCount={unlockedCount}
			currentStreak={currentStreak}
			newAchievementIds={newAchievementIds}
			onMarkAllAsViewed={handleMarkAllAsViewed}
		/>
	);
};
