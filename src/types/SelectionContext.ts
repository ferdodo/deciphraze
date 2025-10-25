import type { LetterSelectionRepository } from "./LetterSelectionRepository";
import type { SymbolSelectionRepository } from "./SymbolSelectionRepository";
import type { PlayerCipherRepository } from "./PlayerCipherRepository";

export interface SelectionContext {
	letterSelectionRepository: LetterSelectionRepository;
	symbolSelectionRepository: SymbolSelectionRepository;
	playerCipherRepository: PlayerCipherRepository;
}
