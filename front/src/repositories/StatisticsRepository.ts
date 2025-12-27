import type { Observable } from "rxjs";
import type { Statistics } from "../entities/Statistics";

export interface StatisticsRepository {
	getStatistics(): Statistics;
	saveStatistics(statistics: Statistics): void;
	statistics$: Observable<Statistics>;
}

