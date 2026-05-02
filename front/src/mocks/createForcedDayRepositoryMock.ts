import type { ForcedDayRepository } from "@deciphraze/core";
import { createForcedDayRepository } from "../utils/createForcedDayRepository";

export function createForcedDayRepositoryMock(): ForcedDayRepository {
	return createForcedDayRepository();
}
