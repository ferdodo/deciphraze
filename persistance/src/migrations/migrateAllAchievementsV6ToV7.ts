import type { AllAchievementsV6 } from "../entities/AllAchievementsV6";
import type { AllAchievementsV7 } from "../entities/AllAchievementsV7";

export const migrateAllAchievementsV6ToV7 = (
	v6: AllAchievementsV6,
): AllAchievementsV7 => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { completeAlphabet, ...achievements } = v6.achievements;

	return {
		computedAtDate: v6.computedAtDate,
		achievements,
	};
};
