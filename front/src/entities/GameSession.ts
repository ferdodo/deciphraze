export type GameSession = {
	// Date calendaire (ISO 8601) quand la victoire s'est produite (le jour réel du joueur)
	// Exemple: si le joueur gagne le jeudi, winAt = "2024-01-25" (jeudi)
	winAt: string;
	lettersFound: string[];
	wordsFound?: number;
	hasErrors?: boolean;
};

