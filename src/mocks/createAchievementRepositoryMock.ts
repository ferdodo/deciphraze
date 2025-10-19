import { of } from "rxjs";
import type { AchievementRepository } from "../types/AchievementRepository";
import type { AllAchievements } from "../types/AllAchievements";

export function createAchievementRepositoryMock(
	initialAchievements?: Partial<AllAchievements>,
	onSaveAchievements?: (achievements: AllAchievements) => void
): AchievementRepository {
	return {
		loadAchievements: () => ({
			computedAtDate: new Date().toISOString(),
			achievements: {
				firstGame: {
					achievementId: "first_game",
					name: "Premier pas",
					description: "Jouer votre première partie",
					unlocked: false
				},
				streak5Days: {
					achievementId: "streak_5_days",
					name: "Série de 5 jours",
					description: "Réussir une partie 5 jours consécutifs",
					unlocked: false,
					progress: { current: 0, target: 5 }
				},
				...initialAchievements?.achievements
			}
		}),
		saveAchievements: (achievements: AllAchievements) => {
			onSaveAchievements?.(achievements);
		},
		achievements$: of({} as AllAchievements)
	};
}
