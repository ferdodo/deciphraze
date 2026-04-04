import type { AllAchievementsV1Repository } from "./AllAchievementsV1Repository";
import type { AllAchievementsV1 } from "./AllAchievementsV1";

const ACHIEVEMENTS_STORAGE_KEY = "deciphraze_achievements";

const defaultAchievements: AllAchievementsV1 = {
	computedAtDate: "2024-01-01T00:00:00.000Z",
	achievements: {
		firstGame: { name: "Préambule", description: "Jouer votre première partie", unlocked: false },
		streak5Days: { name: "Momentum", description: "Réussir une partie 5 jours consécutifs", unlocked: false, progress: { current: 0, target: 5 } },
		firstLetterA: { name: "Aperçu", description: "Trouver la lettre A en premier", unlocked: false },
		firstLetterE: { name: "Élémentaire", description: "Trouver la lettre E en premier", unlocked: false },
		firstLetterY: { name: "Mythique", description: "Trouver la lettre Y en premier", unlocked: false },
		wordInOrder: { name: "Signature", description: "Trouver toutes les lettres d'un mot d'au moins 5 lettres dans l'ordre", unlocked: false },
		alphaAndOmega: { name: "Synthèse", description: "Déchiffrer la première lettre en premier, la dernière en dernier", unlocked: false },
		firstLetterQ: { name: "Qualifié", description: "Trouver la lettre Q en premier", unlocked: false },
		words1000: { name: "Scribe", description: "Déchiffrez 500 mots", unlocked: false, progress: { current: 0, target: 500 } },
		completeAlphabet: { name: "Lettré", description: "Trouver toutes les lettres de l'alphabet", unlocked: false, progress: { current: 0, target: 26 } },
		paleographer: { name: "Paléographe", description: "Compléter une partie sans erreur d'association", unlocked: false },
		allVowelsInSequence: { name: "Vocaliste", description: "Trouver toutes les voyelles à la suite", unlocked: false },
	},
};

export const createAllAchievementsV1Repository = (
	storage: Storage = window.localStorage,
	achievements: AllAchievementsV1 = defaultAchievements,
): AllAchievementsV1Repository => {
	const listeners: ((achievements: AllAchievementsV1) => void)[] = [];
	let achievementsData: AllAchievementsV1;

	try {
		const stored: string = storage.getItem(ACHIEVEMENTS_STORAGE_KEY) ?? "";
		if (stored === "" || stored === "null") {
			achievementsData = achievements;
		} else {
			achievementsData = JSON.parse(stored);
		}
	} catch (_error) {
		achievementsData = achievements;
	}

	function loadAchievements(): AllAchievementsV1 {
		return achievementsData;
	}

	function saveAchievements(newAchievements: AllAchievementsV1): void {
		achievementsData = newAchievements;
		storage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(achievementsData));
		notifyListeners();
	}

	function subscribe(
		listener: (achievements: AllAchievementsV1) => void,
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
		achievementsData = achievements;
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
