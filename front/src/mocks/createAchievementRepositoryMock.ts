import { Subject } from "rxjs";
import { share } from "rxjs/operators";
import type { AchievementRepository } from "../repositories/AchievementRepository";
import type { AllAchievements } from "../entities/AllAchievements";
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

	function clear(): void {
		achievements = defaultAchievements;
		achievements$.next(achievements);
	}

	return {
		loadAchievements,
		saveAchievements,
		achievements$: achievements$.asObservable().pipe(share()),
		clear,
	};
}