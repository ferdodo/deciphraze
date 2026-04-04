import { useMemo } from "react";
import type { AllAchievements } from "@deciphraze/core";
import { useAchievements } from "./useAchievements";

export const useAchievementsAsList = (): Array<AllAchievements["achievements"][keyof AllAchievements["achievements"]]> => {
	const achievements = useAchievements();
	return useMemo(() => [
		achievements.achievements.firstGame,
		achievements.achievements.streak5Days,
		achievements.achievements.firstLetterA,
		achievements.achievements.firstLetterE,
		achievements.achievements.firstLetterY,
		achievements.achievements.firstLetterQ,
		achievements.achievements.words1000,
		achievements.achievements.completeAlphabet,
		achievements.achievements.paleographer,
		achievements.achievements.doublet,
	], [achievements]);
};

