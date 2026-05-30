import type { AllAchievementsV6 } from "../entities";
import type { AllAchievementsV6Repository } from "../repositories";
import { migrateAllAchievementsV5ToV6 } from "../repositories/migrations";
import { createAllAchievementsV5Repository } from "./createAllAchievementsV5Repository";

const ACHIEVEMENTS_STORAGE_KEY = "deciphraze_achievements_v6";

export const createAllAchievementsV6Repository = (
	storage: Storage = window.localStorage,
): AllAchievementsV6Repository => {
	const listeners: ((achievements: AllAchievementsV6) => void)[] = [];

	function migrate(): AllAchievementsV6 {
		const v5Repository = createAllAchievementsV5Repository(storage);
		const v5Data = v5Repository.loadAchievements();
		return migrateAllAchievementsV5ToV6(v5Data);
	}

	let achievementsData: AllAchievementsV6;

	const v6Stored = storage.getItem(ACHIEVEMENTS_STORAGE_KEY);
	if (!v6Stored) {
		achievementsData = migrate();
	} else {
		try {
			achievementsData = JSON.parse(v6Stored);
		} catch {
			achievementsData = migrate();
		}
	}

	function loadAchievements(): AllAchievementsV6 {
		return achievementsData;
	}

	function saveAchievements(newAchievements: AllAchievementsV6): void {
		achievementsData = newAchievements;
		storage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(achievementsData));
		notifyListeners();
	}

	function subscribe(
		listener: (achievements: AllAchievementsV6) => void,
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
