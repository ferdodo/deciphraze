import { useState, useEffect } from "react";
import { useGameContext } from "./useGameContext";
import type { AllAchievements } from "@deciphraze/core";

export const useAchievements = (): AllAchievements => {
	const { achievementRepository } = useGameContext();
	const [achievements, setAchievements] = useState<AllAchievements>(achievementRepository.loadAchievements());

	useEffect(() => {
		const unsubscribe = achievementRepository.subscribe((newAchievements: AllAchievements) => {
			setAchievements(newAchievements);
		});

		return unsubscribe;
	}, [achievementRepository]);

	return achievements;
};
