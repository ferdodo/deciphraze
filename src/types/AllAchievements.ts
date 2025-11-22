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
		firstLetterA: {
			achievementId: "first_letter_a";
			name: "Commencer par A";
			description: "Trouver la lettre A en premier";
			unlocked: boolean;
		};
		wordInOrder: {
			achievementId: "word_in_order";
			name: "D'un trait";
			description: "Trouver toutes les lettres d'un mot d'au moins 5 lettres dans l'ordre";
			unlocked: boolean;
		};
	};
}
