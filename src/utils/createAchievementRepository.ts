import { Subject } from "rxjs";
import { share } from "rxjs/operators";
import type { AchievementRepository } from "../repositories/AchievementRepository";
import type { AllAchievements } from "../entities/AllAchievements";
import { defaultAchievements } from "../constants/defaultAchievements";
import { checkAchievements } from "./checkAchievements";

const ACHIEVEMENTS_STORAGE_KEY = "deciphraze_achievements";

export function createAchievementRepository(): AchievementRepository {
	const achievements$ = new Subject<AllAchievements>();
	let achievements: AllAchievements;

	try {
		const stored: string = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY) ?? "";
		if (stored === "" || stored === "null") {
			achievements = defaultAchievements;
		} else {
			achievements = checkAchievements(JSON.parse(stored));
		}
	} catch (_error) {
		achievements = defaultAchievements;
	}

	function loadAchievements(): AllAchievements {
		return achievements;
	}

	function saveAchievements(newAchievements: AllAchievements): void {
		achievements = newAchievements;
		localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(achievements));
		achievements$.next(achievements);
	}

	return {
		loadAchievements,
		saveAchievements,
		achievements$: achievements$.asObservable().pipe(share()),
	};
}

