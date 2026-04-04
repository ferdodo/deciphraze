import type { AllAchievementsV3 } from "../entities/AllAchievementsV3";
import type { AllAchievementsV4 } from "../repositories/AllAchievementsV4";

export const migrateAllAchievementsV3ToV4 = (
	v3: AllAchievementsV3,
): AllAchievementsV4 => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { wordInOrder, ...achievements } = v3.achievements;

	return {
		computedAtDate: v3.computedAtDate,
		achievements,
	};
};
