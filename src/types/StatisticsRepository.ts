import type { Observable } from "rxjs";
import type { Statistics } from "./Statistics";

export interface StatisticsRepository {
	getStatistics(): Statistics;
	saveStatistics(statistics: Statistics): void;
	statistics$: Observable<Statistics>;
}

