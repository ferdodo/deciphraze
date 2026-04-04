import type { AllAchievementsV3 } from "../entities";
import type { AllAchievementsV3Repository } from "../repositories";
import { migrateAllAchievementsV2ToV3 } from "../repositories/migrations";
import { createAllAchievementsV2Repository } from "./createAllAchievementsV2Repository";

const ACHIEVEMENTS_STORAGE_KEY = "deciphraze_achievements_v3";

const defaultAchievements: AllAchievementsV3 = {
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
		wordInOrder: {
			name: "Signature",
			description:
				"Trouver toutes les lettres d'un mot d'au moins 5 lettres dans l'ordre",
			unlocked: false,
		},
		alphaAndOmega: {
			name: "Synthèse",
			description:
				"Déchiffrer la première lettre en premier, la dernière en dernier",
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

export const createAllAchievementsV3Repository = (
	storage: Storage = window.localStorage,
): AllAchievementsV3Repository => {
	const listeners: ((achievements: AllAchievementsV3) => void)[] = [];

	let achievementsData: AllAchievementsV3;

	const v3Stored = storage.getItem(ACHIEVEMENTS_STORAGE_KEY);
	if (!v3Stored) {
		const v2Repository = createAllAchievementsV2Repository(storage);
		const v2Data = v2Repository.loadAchievements();
		achievementsData = migrateAllAchievementsV2ToV3(v2Data);
	} else {
		try {
			achievementsData = JSON.parse(v3Stored);
		} catch {
			achievementsData = defaultAchievements;
		}
	}

	function loadAchievements(): AllAchievementsV3 {
		return achievementsData;
	}

	function saveAchievements(newAchievements: AllAchievementsV3): void {
		achievementsData = newAchievements;
		storage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(achievementsData));
		notifyListeners();
	}

	function subscribe(
		listener: (achievements: AllAchievementsV3) => void,
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
