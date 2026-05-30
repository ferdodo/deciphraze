import { useMemo } from "react";
import { useAchievements } from "./useAchievements";
import { useViewedAchievements } from "./useViewedAchievements";
import { getNewAchievementIds } from "../utils/getNewAchievementIds";

export const useHasNewAchievements = (): boolean => {
	const achievements = useAchievements();
	const viewedAchievements = useViewedAchievements();

	return useMemo(() => {
		return getNewAchievementIds(achievements, viewedAchievements).length > 0;
	}, [achievements, viewedAchievements]);
};
