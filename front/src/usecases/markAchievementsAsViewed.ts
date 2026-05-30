import type { ViewedAchievementsRepository } from "@deciphraze/core";
import type { ViewedAchievements } from "@deciphraze/core";

export function markAchievementsAsViewed(
	achievementIds: (keyof ViewedAchievements)[],
	viewedAchievementsRepository: ViewedAchievementsRepository
): void {
	const currentViewed = viewedAchievementsRepository.getViewedAchievements();
	
	const newViewedAchievements: ViewedAchievements = { ...currentViewed };
	
	for (const id of achievementIds) {
		newViewedAchievements[id] = true;
	}
	
	viewedAchievementsRepository.saveViewedAchievement(newViewedAchievements);
}
