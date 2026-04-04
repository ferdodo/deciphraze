import type { AllAchievementsV5 } from "../entities/AllAchievementsV5";
import type { AllAchievementsV6 } from "../entities/AllAchievementsV6";

export const migrateAllAchievementsV5ToV6 = (
	v5: AllAchievementsV5,
): AllAchievementsV6 => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { allVowelsInSequence, ...achievements } = v5.achievements;

	return {
		computedAtDate: v5.computedAtDate,
		achievements,
	};
};
