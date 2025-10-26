import type { LetterSelectionRepository } from "./LetterSelectionRepository";
import type { SymbolSelectionRepository } from "./SymbolSelectionRepository";
import type { PlayerCipherRepository } from "./PlayerCipherRepository";
import type { DiscoveryOrderRepository } from "./DiscoveryOrderRepository";
import type { DayRepository } from "./DayRepository";

export interface SelectionContext {
	letterSelectionRepository: LetterSelectionRepository;
	symbolSelectionRepository: SymbolSelectionRepository;
	playerCipherRepository: PlayerCipherRepository;
	discoveryOrderRepository: DiscoveryOrderRepository;
	dayRepository: DayRepository;
}
