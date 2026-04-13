import type { Temporal } from "temporal-polyfill";

export interface TimeService {
	getRealDay(): Temporal.PlainDate;
	observeRealDay(listener: (realDay: Temporal.PlainDate) => void): () => void;
	setInterval(callback: () => void, delayInMilliseconds: number): () => void;
	setTimeout(callback: () => void, delayInMilliseconds: number): () => void;
}
