export interface Statistics {
	totalGames: number;
	totalWordsFound: number;
	firstGameDate: string | null;
	lastGameDate: string | null;
	averageWordsPerGame: number;
	letterPositions: Array<Array<string>>;
	lastUpdated: string;
}

