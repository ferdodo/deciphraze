import type { AllGamesRepository } from "../repositories/AllGamesRepository";
import type { DiscoveryOrderRepository } from "../repositories/DiscoveryOrderRepository";
import type { DayRepository } from "../repositories/DayRepository";

export interface SelectionContext {
	allGamesRepository: AllGamesRepository;
	discoveryOrderRepository: DiscoveryOrderRepository;
	dayRepository: DayRepository;
}
