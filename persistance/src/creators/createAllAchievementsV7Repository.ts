import type { AllAchievementsV7 } from "../entities";
import type { AllAchievementsV7Repository } from "../repositories";
import { migrateAllAchievementsV6ToV7 } from "../repositories/migrations";
import { createAllAchievementsV6Repository } from "./createAllAchievementsV6Repository";

const ACHIEVEMENTS_STORAGE_KEY = "deciphraze_achievements_v7";

export const createAllAchievementsV7Repository = (
	storage: Storage = window.localStorage,
): AllAchievementsV7Repository => {
	const listeners: ((achievements: AllAchievementsV7) => void)[] = [];

	function migrate(): AllAchievementsV7 {
		const v6Repository = createAllAchievementsV6Repository(storage);
		const v6Data = v6Repository.loadAchievements();
		return migrateAllAchievementsV6ToV7(v6Data);
	}

	let achievementsData: AllAchievementsV7;

	const v7Stored = storage.getItem(ACHIEVEMENTS_STORAGE_KEY);
	if (!v7Stored) {
		achievementsData = migrate();
	} else {
		try {
			achievementsData = JSON.parse(v7Stored);
		} catch {
			achievementsData = migrate();
		}
	}

	function loadAchievements(): AllAchievementsV7 {
		return achievementsData;
	}

	function saveAchievements(newAchievements: AllAchievementsV7): void {
		achievementsData = newAchievements;
		storage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(achievementsData));
		notifyListeners();
	}

	function subscribe(
		listener: (achievements: AllAchievementsV7) => void,
	): () => void {
		listeners.push(listener);
		return () => {
			const index = listeners.indexOf(listener);
			if (index > -1) {
				listeners.splice(index, 1);
			}
		};
	}

	function notifyListeners(): void {
		for (const listener of listeners) {
			listener(achievementsData);
		}
	}

	function clear(): void {
		achievementsData = migrate();
		storage.removeItem(ACHIEVEMENTS_STORAGE_KEY);
		notifyListeners();
	}

	return {
		loadAchievements,
		saveAchievements,
		subscribe,
		clear,
	};
};
