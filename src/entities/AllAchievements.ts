export interface AllAchievements {
	computedAtDate: string;
	achievements: {
		firstGame: {
			achievementId: "first_game";
			name: "Préambule";
			description: "Jouer votre première partie";
			unlocked: boolean;
		};
		streak5Days: {
			achievementId: "streak_5_days";
			name: "Momentum";
			description: "Réussir une partie 5 jours consécutifs";
			unlocked: boolean;
			progress: {
				current: number;
				target: 5;
			};
		};
		firstLetterA: {
			achievementId: "first_letter_a";
			name: "Aperçu";
			description: "Trouver la lettre A en premier";
			unlocked: boolean;
		};
		firstLetterE: {
			achievementId: "first_letter_e";
			name: "Élémentaire";
			description: "Trouver la lettre E en premier";
			unlocked: boolean;
		};
		firstLetterY: {
			achievementId: "first_letter_y";
			name: "Mythique";
			description: "Trouver la lettre Y en premier";
			unlocked: boolean;
		};
		wordInOrder: {
			achievementId: "word_in_order";
			name: "Signature";
			description: "Trouver toutes les lettres d'un mot d'au moins 5 lettres dans l'ordre";
			unlocked: boolean;
		};
		alphaAndOmega: {
			achievementId: "alpha_and_omega";
			name: "Synthèse";
			description: "Trouver respectivement la première lettre du paragraphe en premier et la dernière lettre en dernier";
			unlocked: boolean;
		};
		firstLetterQ: {
			achievementId: "first_letter_q";
			name: "Qualifié";
			description: "Trouver la lettre Q en premier";
			unlocked: boolean;
		};
		words1000: {
			achievementId: "words_1000";
			name: "Scribe";
			description: "Déchiffrez 500 mots";
			unlocked: boolean;
			progress: {
				current: number;
				target: 500;
			};
		};
		completeAlphabet: {
			achievementId: "complete_alphabet";
			name: "Lettré";
			description: "Trouver toutes les lettres de l'alphabet";
			unlocked: boolean;
			progress: {
				current: number;
				target: 26;
			};
		};
	};
}

