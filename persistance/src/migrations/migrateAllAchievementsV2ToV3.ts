import type { AllAchievementsV2 } from "./AllAchievementsV2";
import type { AllAchievementsV3 } from "./AllAchievementsV3";

export function migrateAllAchievementsV2ToV3(v2: AllAchievementsV2): AllAchievementsV3 {
	return {
		computedAtDate: v2.computedAtDate,
		achievements: {
			...v2.achievements,
			doublet: {
				name: "Doublet",
				description: "Trouver une double lettre en premier",
				unlocked: false,
			},
		},
	};
}
