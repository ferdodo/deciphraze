import type { AllAchievementsV3 } from "./AllAchievementsV3";

export interface AllAchievementsV3Repository {
	loadAchievements(): AllAchievementsV3;
	saveAchievements(achievements: AllAchievementsV3): void;
	subscribe(listener: (achievements: AllAchievementsV3) => void): () => void;
	clear(): void;
}
