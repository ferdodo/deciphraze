import { Subject } from "rxjs";
import { share } from "rxjs/operators";
import type { StatisticsRepository } from "../repositories/StatisticsRepository";
import type { Statistics } from "../types/Statistics";

const STATISTICS_STORAGE_KEY = "deciphraze_statistics";

const defaultStatistics: Statistics = {
	totalGames: 0,
	totalWordsFound: 0,
	firstGameDate: null,
	lastGameDate: null,
	averageWordsPerGame: 0,
	letterPositions: [],
	lastUpdated: new Date().toISOString()
};

export function createStatisticsRepository(): StatisticsRepository {
	const statistics$ = new Subject<Statistics>();
	let statistics: Statistics;

	try {
		const stored: string = localStorage.getItem(STATISTICS_STORAGE_KEY) ?? "";
		if (stored === "" || stored === "null") {
			statistics = defaultStatistics;
		} else {
			const parsed = JSON.parse(stored);
			// Validation basique
			if (parsed && typeof parsed === "object") {
				// Validation de letterPositions
				let letterPositions: Array<Array<string>> = [];
				if (Array.isArray(parsed.letterPositions)) {
					letterPositions = parsed.letterPositions.filter((entry: unknown) => 
						Array.isArray(entry) && entry.every((letter: unknown) => typeof letter === "string")
					) as Array<Array<string>>;
				}

				statistics = {
					totalGames: typeof parsed.totalGames === "number" ? parsed.totalGames : 0,
					totalWordsFound: typeof parsed.totalWordsFound === "number" ? parsed.totalWordsFound : 0,
					firstGameDate: typeof parsed.firstGameDate === "string" || parsed.firstGameDate === null ? parsed.firstGameDate : null,
					lastGameDate: typeof parsed.lastGameDate === "string" || parsed.lastGameDate === null ? parsed.lastGameDate : null,
					averageWordsPerGame: typeof parsed.averageWordsPerGame === "number" ? parsed.averageWordsPerGame : 0,
					letterPositions: letterPositions,
					lastUpdated: typeof parsed.lastUpdated === "string" ? parsed.lastUpdated : new Date().toISOString()
				};
			} else {
				statistics = defaultStatistics;
			}
		}
	} catch (_error) {
		statistics = defaultStatistics;
	}

	function getStatistics(): Statistics {
		return statistics;
	}

	function saveStatistics(newStatistics: Statistics): void {
		statistics = {
			...newStatistics,
			lastUpdated: new Date().toISOString()
		};
		localStorage.setItem(STATISTICS_STORAGE_KEY, JSON.stringify(statistics));
		statistics$.next(statistics);
	}

	return {
		getStatistics,
		saveStatistics,
		statistics$: statistics$.asObservable().pipe(share()),
	};
}

