import type { AllAchievementsV7 } from "../entities/AllAchievementsV7";

export interface AllAchievementsV7Repository {
	loadAchievements(): AllAchievementsV7;
	saveAchievements(achievements: AllAchievementsV7): void;
	subscribe(listener: (achievements: AllAchievementsV7) => void): () => void;
	clear(): void;
}
