import { useState, useEffect } from "react";
import { useGameContext } from "./useGameContext";
import type { AllAchievements } from "../entities/AllAchievements";

export const useAchievements = (): AllAchievements => {
	const { achievementRepository } = useGameContext();
	const [achievements, setAchievements] = useState<AllAchievements>(achievementRepository.loadAchievements());

	useEffect(() => {
		const subscription = achievementRepository.achievements$.subscribe((newAchievements: AllAchievements) => {
			setAchievements(newAchievements);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [achievementRepository]);

	return achievements;
};
