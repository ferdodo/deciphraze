import type { AllAchievements } from "@deciphraze/core";
import type { ViewedAchievements } from "@deciphraze/core";

export function getNewAchievementIds(
	achievements: AllAchievements,
	viewedAchievements: ViewedAchievements
): (keyof ViewedAchievements)[] {
	const newIds: (keyof ViewedAchievements)[] = [];
	for (const _key of Object.keys(achievements.achievements)) {
		const key: keyof ViewedAchievements = _key as keyof ViewedAchievements;
		const achievement = achievements.achievements[key];

		if (achievement.unlocked && !viewedAchievements[key]) {
			newIds.push(key);
		}
	}
	return newIds;
}
