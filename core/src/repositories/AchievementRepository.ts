import type { AllAchievements } from "../entities/AllAchievements";

export interface AchievementRepository {
	loadAchievements(): AllAchievements;
	saveAchievements(achievements: AllAchievements): void;
	subscribe(callback: (achievements: AllAchievements) => void): () => void;
	clear(): void;
}
