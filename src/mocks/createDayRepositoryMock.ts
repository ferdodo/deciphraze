import type { DayRepository } from "../repositories/DayRepository";

export function createDayRepositoryMock(): DayRepository {
	return {
		getDay(): string {
			return "2024-01-15";
		}
	};
}
