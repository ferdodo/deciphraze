import type { AllAchievementsV2 } from "./AllAchievementsV2";

export interface AllAchievementsV2Repository {
	loadAchievements(): AllAchievementsV2;
	saveAchievements(achievements: AllAchievementsV2): void;
	subscribe(listener: (achievements: AllAchievementsV2) => void): () => void;
	clear(): void;
}
