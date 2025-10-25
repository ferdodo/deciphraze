import type { DayRepository } from "../types/DayRepository";
import { getCurrentDate } from "./getCurrentDate";

export function createDayRepository(): DayRepository {
	return {
		getDay(): string {
			return getCurrentDate();
		}
	};
}
