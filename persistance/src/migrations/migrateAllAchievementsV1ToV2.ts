import type { AllAchievementsV1 } from "../entities/AllAchievementsV1";
import type { AllAchievementsV2 } from "../entities/AllAchievementsV2";

export function migrateAllAchievementsV1ToV2(
	v1: AllAchievementsV1,
): AllAchievementsV2 {
	return {
		computedAtDate: v1.computedAtDate,
		achievements: {
			...v1.achievements,
			streak5Days: {
				...v1.achievements.streak5Days,
				name: "Momentum",
				description: "Réussir une partie 3 jours consécutifs",
				progress: {
					current: v1.achievements.streak5Days.progress.current,
					target: 3,
				},
			},
		},
	};
}
