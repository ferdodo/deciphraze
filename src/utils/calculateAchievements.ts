import type { GameHistory } from "../types/GameHistory";
import type { Achievement } from "../types/Achievement";
import type { FirstGameAchievement } from "../types/FirstGameAchievement";
import type { Streak5DaysAchievement } from "../types/Streak5DaysAchievement";

export function calculateAchievements(gameHistory: GameHistory): Achievement[] {
	const sessions = Array.from(gameHistory.entries()).sort(([a], [b]) =>
		a.localeCompare(b),
	);

	const currentStreak = calculateCurrentStreak(sessions);
	const hasPlayedAtLeastOnce = sessions.length > 0;

	const achievements: Achievement[] = [];

	if (hasPlayedAtLeastOnce) {
		const firstGame: FirstGameAchievement = {
			achievementId: "first_game",
			name: "Premier pas",
			description: "Jouer votre première partie",
		};
		achievements.push(firstGame);
	}

	if (currentStreak >= 5) {
		const streak5Days: Streak5DaysAchievement = {
			achievementId: "streak_5_days",
			name: "Série de 5 jours",
			description: "Réussir une partie 5 jours consécutifs",
		};
		achievements.push(streak5Days);
	}

	return achievements;
}

function calculateCurrentStreak(sessions: [string, string[]][]): number {
	if (sessions.length === 0) return 0;

	const today = new Date();
	let streak = 0;
	const currentDate = new Date(today);

	const todayStr = today.toISOString().split("T")[0];
	if (sessions.some(([date]) => date === todayStr)) {
		streak++;
		currentDate.setDate(currentDate.getDate() - 1);
	}

	while (true) {
		const dateStr = currentDate.toISOString().split("T")[0];
		if (sessions.some(([date]) => date === dateStr)) {
			streak++;
			currentDate.setDate(currentDate.getDate() - 1);
		} else {
			const yesterday = new Date(today);
			yesterday.setDate(yesterday.getDate() - 1);
			const yesterdayStr = yesterday.toISOString().split("T")[0];

			if (
				dateStr === yesterdayStr &&
				sessions.some(([date]) => date === yesterdayStr)
			) {
				streak++;
				currentDate.setDate(currentDate.getDate() - 1);
			} else {
				break;
			}
		}
	}

	return streak;
}
