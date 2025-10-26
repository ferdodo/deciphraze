import { Subject } from "rxjs";
import { share } from "rxjs/operators";
import type { AchievementRepository } from "../types/AchievementRepository";
import type { AllAchievements } from "../types/AllAchievements";
import { defaultAchievements } from "../constants/defaultAchievements";

export function createAchievementRepositoryMock(): AchievementRepository {
	const achievements$ = new Subject<AllAchievements>();
	let achievements: AllAchievements = defaultAchievements;

	function loadAchievements(): AllAchievements {
		return achievements;
	}

	function saveAchievements(newAchievements: AllAchievements): void {
		achievements = newAchievements;
		achievements$.next(achievements);
	}

	return {
		loadAchievements,
		saveAchievements,
		achievements$: achievements$.asObservable().pipe(share()),
	};
}