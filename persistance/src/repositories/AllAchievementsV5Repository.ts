import type { AllAchievementsV5 } from "../entities/AllAchievementsV5";

export interface AllAchievementsV5Repository {
	loadAchievements(): AllAchievementsV5;
	saveAchievements(achievements: AllAchievementsV5): void;
	subscribe(listener: (achievements: AllAchievementsV5) => void): () => void;
	clear(): void;
}
