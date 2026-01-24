import type { ViewedAchievementsRepository } from "../repositories/ViewedAchievementsRepository";
import type { ViewedAchievements } from "../entities/ViewedAchievements";

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
