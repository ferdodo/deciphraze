import type { GameHistory } from "../types/GameHistory";
import type { Achievement } from "../types/Achievement";
import { calculateMaxStreak } from "./calculateMaxStreak";

export function calculateAchievements(gameHistory: GameHistory): Achievement[] {
	const achievements: Achievement[] = [];

	if (gameHistory.size > 0) {
		achievements.push({
			achievementId: "first_game",
			name: "Premier pas",
			description: "Jouer votre première partie",
		});
	}

	if (calculateMaxStreak(gameHistory) >= 5) {
		achievements.push({
			achievementId: "streak_5_days",
			name: "Série de 5 jours",
			description: "Réussir une partie 5 jours consécutifs",
		});
	}

	return achievements;
}
