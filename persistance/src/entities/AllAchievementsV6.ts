export interface AllAchievementsV6 {
	computedAtDate: string;
	achievements: {
		firstGame: {
			name: "Préambule";
			description: "Jouer votre première partie";
			unlocked: boolean;
		};
		streak5Days: {
			name: "Momentum";
			description: "Réussir une partie 3 jours consécutifs";
			unlocked: boolean;
			progress: {
				current: number;
				target: 3;
			};
		};
		firstLetterA: {
			name: "Aperçu";
			description: "Trouver la lettre A en premier";
			unlocked: boolean;
		};
		firstLetterE: {
			name: "Élémentaire";
			description: "Trouver la lettre E en premier";
			unlocked: boolean;
		};
		firstLetterY: {
			name: "Mythique";
			description: "Trouver la lettre Y en premier";
			unlocked: boolean;
		};
		firstLetterQ: {
			name: "Qualifié";
			description: "Trouver la lettre Q en premier";
			unlocked: boolean;
		};
		words1000: {
			name: "Scribe";
			description: "Déchiffrez 500 mots";
			unlocked: boolean;
			progress: {
				current: number;
				target: 500;
			};
		};
		completeAlphabet: {
			name: "Lettré";
			description: "Trouver toutes les lettres de l'alphabet";
			unlocked: boolean;
			progress: {
				current: number;
				target: 26;
			};
		};
		paleographer: {
			name: "Paléographe";
			description: "Compléter une partie sans erreur d'association";
			unlocked: boolean;
		};
		doublet: {
			name: "Doublet";
			description: "Trouver une double lettre en premier";
			unlocked: boolean;
		};
	};
}
