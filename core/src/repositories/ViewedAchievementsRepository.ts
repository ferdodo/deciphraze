import type { Observable } from "rxjs";
import type { ViewedAchievements } from "../entities/ViewedAchievements";

export interface ViewedAchievementsRepository {
	getViewedAchievements(): ViewedAchievements;
	saveViewedAchievement(viewedAchievements: ViewedAchievements): void;
	viewedAchievements$: Observable<ViewedAchievements>;
}
