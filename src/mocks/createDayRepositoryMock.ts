import type { DayRepository } from "../types/DayRepository";

export function createDayRepositoryMock(): DayRepository {
	return {
		getDay(): string {
			return "2024-01-15";
		}
	};
}
