import { useMemo } from "react";
import { useAchievements } from "./useAchievements";
import { useViewedAchievements } from "./useViewedAchievements";
import { getNewAchievementIds } from "../utils/getNewAchievementIds";
import type { ViewedAchievements } from "../entities/ViewedAchievements";

export const useNewAchievementIds = (): (keyof ViewedAchievements)[] => {
	const achievements = useAchievements();
	const viewedAchievements = useViewedAchievements();

	return useMemo(() => {
		return getNewAchievementIds(achievements, viewedAchievements);
	}, [achievements, viewedAchievements]);
};
