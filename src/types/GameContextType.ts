import type { LetterSelectionRepository } from "./LetterSelectionRepository";
import type { PlayerCipherRepository } from "./PlayerCipherRepository";
import type { SymbolSelectionRepository } from "./SymbolSelectionRepository";
import type { CipherRepository } from "./CipherRepository";
import type { GameHistoryRepository } from "./GameHistoryRepository";
import type { AchievementRepository } from "./AchievementRepository";
import type { ParagraphOfTheDayRepository } from "./ParagraphOfTheDayRepository";
import type { DayRepository } from "./DayRepository";

export interface GameContextType {
	letterSelectionRepository: LetterSelectionRepository;
	playerCipherRepository: PlayerCipherRepository;
	symbolSelectionRepository: SymbolSelectionRepository;
	cipherRepository: CipherRepository;
	gameHistoryRepository: GameHistoryRepository;
	achievementRepository: AchievementRepository;
	paragraphOfTheDayRepository: ParagraphOfTheDayRepository;
	dayRepository: DayRepository;
}
