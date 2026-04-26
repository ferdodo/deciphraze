import { useAchievements } from "./useAchievements";

export const useIsPlatinumEarned = (): boolean => {
	const achievements = useAchievements();

	// Platinum is earned when all achievements are unlocked
	const allUnlocked = Object.values(achievements.achievements).every(
		(achievement) => achievement.unlocked,
	);

	return allUnlocked;
};
