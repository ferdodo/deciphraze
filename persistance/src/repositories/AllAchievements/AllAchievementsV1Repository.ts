import type { AllAchievementsV1 } from "./AllAchievementsV1";

export interface AllAchievementsV1Repository {
	loadAchievements(): AllAchievementsV1;
	saveAchievements(achievements: AllAchievementsV1): void;
	subscribe(listener: (achievements: AllAchievementsV1) => void): () => void;
	clear(): void;
}
