import type { LetterSelectionRepository } from "../repositories/LetterSelectionRepository";
import type { SymbolSelectionRepository } from "../repositories/SymbolSelectionRepository";
import type { PlayerCipherRepository } from "../repositories/PlayerCipherRepository";
import type { DiscoveryOrderRepository } from "../repositories/DiscoveryOrderRepository";
import type { DayRepository } from "../repositories/DayRepository";

export interface SelectionContext {
	letterSelectionRepository: LetterSelectionRepository;
	symbolSelectionRepository: SymbolSelectionRepository;
	playerCipherRepository: PlayerCipherRepository;
	discoveryOrderRepository: DiscoveryOrderRepository;
	dayRepository: DayRepository;
}
