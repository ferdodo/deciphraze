import type { AllAchievementsV4 } from "./AllAchievementsV4";

export interface AllAchievementsV4Repository {
	loadAchievements(): AllAchievementsV4;
	saveAchievements(achievements: AllAchievementsV4): void;
	subscribe(listener: (achievements: AllAchievementsV4) => void): () => void;
	clear(): void;
}
