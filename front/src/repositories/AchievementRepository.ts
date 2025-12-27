import type { Observable } from "rxjs";
import type { AllAchievements } from "../entities/AllAchievements";

export interface AchievementRepository {
	loadAchievements(): AllAchievements;
	saveAchievements(achievements: AllAchievements): void;
	achievements$: Observable<AllAchievements>;
}
