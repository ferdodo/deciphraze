import type { ForcedDayRepository } from "../repositories/ForcedDayRepository";
import { createForcedDayRepository } from "../utils/createForcedDayRepository";

export function createForcedDayRepositoryMock(): ForcedDayRepository {
	return createForcedDayRepository();
}
