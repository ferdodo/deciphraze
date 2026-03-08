import type { AchievementRepository } from "@deciphraze/core";
import type { AllAchievements } from "@deciphraze/core";
import { defaultAchievements } from "../constants/defaultAchievements";

export function createAchievementRepositoryMock(): AchievementRepository {
	const listeners: ((achievements: AllAchievements) => void)[] = [];
	let achievements: AllAchievements = defaultAchievements;

	function loadAchievements(): AllAchievements {
		return achievements;
	}

	function saveAchievements(newAchievements: AllAchievements): void {
		achievements = newAchievements;
		notifyListeners();
	}

	function subscribe(callback: (achievements: AllAchievements) => void): () => void {
		listeners.push(callback);
		return () => {
			const index = listeners.indexOf(callback);
			if (index > -1) {
				listeners.splice(index, 1);
			}
		};
	}

	function notifyListeners(): void {
		for (const listener of listeners) {
			listener(achievements);
		}
	}

	function clear(): void {
		achievements = defaultAchievements;
		notifyListeners();
	}

	return {
		loadAchievements,
		saveAchievements,
		subscribe,
		clear,
	};
}