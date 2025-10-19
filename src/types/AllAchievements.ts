export interface AllAchievements {
	computedAtDate: string;
	achievements: {
		firstGame: {
			achievementId: "first_game";
			name: "Premier pas";
			description: "Jouer votre première partie";
			unlocked: boolean;
		};
		streak5Days: {
			achievementId: "streak_5_days";
			name: "Série de 5 jours";
			description: "Réussir une partie 5 jours consécutifs";
			unlocked: boolean;
			progress: {
				current: number;
				target: 5;
			};
		};
	};
}
