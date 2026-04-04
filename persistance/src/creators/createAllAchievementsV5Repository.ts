import type { AllAchievementsV5 } from "../entities";
import type { AllAchievementsV5Repository } from "../repositories";
import { migrateAllAchievementsV4ToV5 } from "../repositories/migrations";
import { createAllAchievementsV4Repository } from "./createAllAchievementsV4Repository";

const ACHIEVEMENTS_STORAGE_KEY = "deciphraze_achievements_v5";

const defaultAchievements: AllAchievementsV5 = {
	computedAtDate: "2024-01-01T00:00:00.000Z",
	achievements: {
		firstGame: {
			name: "Préambule",
			description: "Jouer votre première partie",
			unlocked: false,
		},
		streak5Days: {
			name: "Momentum",
			description: "Réussir une partie 3 jours consécutifs",
			unlocked: false,
			progress: { current: 0, target: 3 },
		},
		firstLetterA: {
			name: "Aperçu",
			description: "Trouver la lettre A en premier",
			unlocked: false,
		},
		firstLetterE: {
			name: "Élémentaire",
			description: "Trouver la lettre E en premier",
			unlocked: false,
		},
		firstLetterY: {
			name: "Mythique",
			description: "Trouver la lettre Y en premier",
			unlocked: false,
		},
		firstLetterQ: {
			name: "Qualifié",
			description: "Trouver la lettre Q en premier",
			unlocked: false,
		},
		words1000: {
			name: "Scribe",
			description: "Déchiffrez 500 mots",
			unlocked: false,
			progress: { current: 0, target: 500 },
		},
		completeAlphabet: {
			name: "Lettré",
			description: "Trouver toutes les lettres de l'alphabet",
			unlocked: false,
			progress: { current: 0, target: 26 },
		},
		paleographer: {
			name: "Paléographe",
			description: "Compléter une partie sans erreur d'association",
			unlocked: false,
		},
		allVowelsInSequence: {
			name: "Vocaliste",
			description: "Trouver toutes les voyelles à la suite",
			unlocked: false,
		},
		doublet: {
			name: "Doublet",
			description: "Trouver une double lettre en premier",
			unlocked: false,
		},
	},
};

export const createAllAchievementsV5Repository = (
	storage: Storage = window.localStorage,
): AllAchievementsV5Repository => {
	const listeners: ((achievements: AllAchievementsV5) => void)[] = [];

	let achievementsData: AllAchievementsV5;

	const v5Stored = storage.getItem(ACHIEVEMENTS_STORAGE_KEY);
	if (!v5Stored) {
		const v4Repository = createAllAchievementsV4Repository(storage);
		const v4Data = v4Repository.loadAchievements();
		achievementsData = migrateAllAchievementsV4ToV5(v4Data);
	} else {
		try {
			achievementsData = JSON.parse(v5Stored);
		} catch {
			achievementsData = defaultAchievements;
		}
	}

	function loadAchievements(): AllAchievementsV5 {
		return achievementsData;
	}

	function saveAchievements(newAchievements: AllAchievementsV5): void {
		achievementsData = newAchievements;
		storage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(achievementsData));
		notifyListeners();
	}

	function subscribe(
		listener: (achievements: AllAchievementsV5) => void,
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
		achievementsData = defaultAchievements;
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
