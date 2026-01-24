import { useState, useEffect } from "react";
import { useGameContext } from "./useGameContext";
import type { ViewedAchievements } from "../entities/ViewedAchievements";

export const useViewedAchievements = (): ViewedAchievements => {
	const { viewedAchievementsRepository } = useGameContext();
	const [viewedAchievements, setViewedAchievements] = useState<ViewedAchievements>(
		() => viewedAchievementsRepository.getViewedAchievements()
	);

	useEffect(() => {
		const subscription = viewedAchievementsRepository.viewedAchievements$.subscribe(
			(newViewedAchievements: ViewedAchievements) => {
				setViewedAchievements(newViewedAchievements);
			}
		);

		return (): void => {
			subscription.unsubscribe();
		};
	}, [viewedAchievementsRepository]);

	return viewedAchievements;
};
