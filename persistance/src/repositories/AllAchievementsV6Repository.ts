import type { AllAchievementsV6 } from "../entities/AllAchievementsV6";

export interface AllAchievementsV6Repository {
	loadAchievements(): AllAchievementsV6;
	saveAchievements(achievements: AllAchievementsV6): void;
	subscribe(listener: (achievements: AllAchievementsV6) => void): () => void;
	clear(): void;
}
