import type { TimeService } from "@deciphraze/core";
import type { ForcedDayRepository } from "../repositories/ForcedDayRepository";

export function getCurrentDay(timeService: TimeService, forcedDayRepository: ForcedDayRepository): string {
	return forcedDayRepository.getForcedVirtualDate() ?? timeService.getRealDay().toString();
}
