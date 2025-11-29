import type { DayRepository } from "../repositories/DayRepository";
import { getCurrentDate } from "./getCurrentDate";

export function createDayRepository(): DayRepository {
	return {
		getDay(): string {
			return getCurrentDate();
		}
	};
}

