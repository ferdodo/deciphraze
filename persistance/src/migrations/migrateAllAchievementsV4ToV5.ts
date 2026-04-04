import type { AllAchievementsV4 } from "../entities/AllAchievementsV4";
import type { AllAchievementsV5 } from "../entities/AllAchievementsV5";

export const migrateAllAchievementsV4ToV5 = (
	v4: AllAchievementsV4,
): AllAchievementsV5 => {
	return {
		computedAtDate: v4.computedAtDate,
		achievements: {
			firstGame: v4.achievements.firstGame,
			streak5Days: v4.achievements.streak5Days,
			firstLetterA: v4.achievements.firstLetterA,
			firstLetterE: v4.achievements.firstLetterE,
			firstLetterY: v4.achievements.firstLetterY,
			firstLetterQ: v4.achievements.firstLetterQ,
			words1000: v4.achievements.words1000,
			completeAlphabet: v4.achievements.completeAlphabet,
			paleographer: v4.achievements.paleographer,
			allVowelsInSequence: v4.achievements.allVowelsInSequence,
			doublet: v4.achievements.doublet,
		},
	};
};
