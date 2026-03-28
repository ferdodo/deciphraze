import type { GameSession } from "./GameSession";

export interface GameHistory {
	// La clé est la date du jeu (ISO 8601) - le jour pour lequel la partie a été publiée
	// Exemple: partie publiée samedi, gagnée jeudi -> clé = samedi
	// La valeur contient winAt qui est le jour calendaire réel (jeudi)
	[date: string]: string[] | GameSession;
}

