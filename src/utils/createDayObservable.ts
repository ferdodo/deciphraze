import { timer, map, startWith, repeat } from "rxjs";
import type { Observable } from "rxjs";
import { getCurrentDate } from "./getCurrentDate";

/**
 * Calcule le nombre de millisecondes jusqu'au prochain minuit
 */
const getMillisecondsUntilMidnight = (): number => {
	const now = new Date();
	const midnight = new Date(now);
	midnight.setHours(24, 0, 0, 0); // Prochain minuit
	return midnight.getTime() - now.getTime();
};

/**
 * Crée un observable qui émet la date du jour (format YYYY-MM-DD) en timezone locale
 * L'observable émet immédiatement la date actuelle, puis se met à jour seulement à minuit
 */
export const createDayObservable = (): Observable<string> => {
	return timer(getMillisecondsUntilMidnight()).pipe(
		startWith(getCurrentDate()),
		map(() => getCurrentDate()),
		repeat()
	);
};
