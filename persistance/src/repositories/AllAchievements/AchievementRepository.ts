import type { AllAchievementsV1 } from "./AllAchievementsV1";

export interface AchievementRepository {
	loadAchievements(): AllAchievementsV1;
	saveAchievements(achievements: AllAchievementsV1): void;
	subscribe(callback: (achievements: AllAchievementsV1) => void): () => void;
	clear(): void;
}
