import { BehaviorSubject } from "rxjs";
import { share } from "rxjs/operators";
import type { ViewedAchievementsRepository } from "../repositories/ViewedAchievementsRepository";
import type { ViewedAchievements } from "../entities/ViewedAchievements";
import type { StorageLike } from "./StorageLike";

const VIEWED_ACHIEVEMENTS_STORAGE_KEY = "deciphraze_viewed_achievements";

const defaultViewedAchievements: ViewedAchievements = {
	firstGame: false,
	streak5Days: false,
	firstLetterA: false,
	firstLetterE: false,
	firstLetterY: false,
	firstLetterQ: false,
	words1000: false,
	completeAlphabet: false,
	paleographer: false,
	allVowelsInSequence: false,
	doublet: false,
};

export function createViewedAchievementsRepository(storage: StorageLike): ViewedAchievementsRepository {
	let viewedAchievements: ViewedAchievements;

	try {
		const stored: string = storage.getItem(VIEWED_ACHIEVEMENTS_STORAGE_KEY) ?? "";
		if (stored === "" || stored === "null") {
			viewedAchievements = { ...defaultViewedAchievements };
		} else {
			const parsed = JSON.parse(stored);
			if (parsed && typeof parsed === "object") {
				// Fusionner avec les valeurs par défaut pour s'assurer que toutes les propriétés existent
				viewedAchievements = { ...defaultViewedAchievements, ...parsed };
			} else {
				viewedAchievements = { ...defaultViewedAchievements };
			}
		}
	} catch (_error) {
		viewedAchievements = { ...defaultViewedAchievements };
	}

	const viewedAchievementsSubject = new BehaviorSubject<ViewedAchievements>({ ...viewedAchievements });

	function getViewedAchievements(): ViewedAchievements {
		return { ...viewedAchievements };
	}

	function saveViewedAchievement(newViewedAchievements: ViewedAchievements): void {
		// Fusionner avec les achievements existants (les nouveaux remplacent les anciens)
		viewedAchievements = { ...viewedAchievements, ...newViewedAchievements };
		storage.setItem(VIEWED_ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(viewedAchievements));
		viewedAchievementsSubject.next({ ...viewedAchievements });
	}

	function clear(): void {
		viewedAchievements = { ...defaultViewedAchievements };
		storage.removeItem(VIEWED_ACHIEVEMENTS_STORAGE_KEY);
		viewedAchievementsSubject.next({ ...viewedAchievements });
	}

	return {
		getViewedAchievements,
		saveViewedAchievement,
		viewedAchievements$: viewedAchievementsSubject.asObservable().pipe(share()),
		clear
	};
}
