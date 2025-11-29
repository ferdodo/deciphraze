import type { LetterSelectionRepository } from "../repositories/LetterSelectionRepository";
import type { PlayerCipherRepository } from "../repositories/PlayerCipherRepository";
import type { SymbolSelectionRepository } from "../repositories/SymbolSelectionRepository";
import type { CipherRepository } from "../repositories/CipherRepository";
import type { GameHistoryRepository } from "../repositories/GameHistoryRepository";
import type { AchievementRepository } from "../repositories/AchievementRepository";
import type { ParagraphOfTheDayRepository } from "../repositories/ParagraphOfTheDayRepository";
import type { DayRepository } from "../repositories/DayRepository";
import type { DiscoveryOrderRepository } from "../repositories/DiscoveryOrderRepository";
import type { StatisticsRepository } from "../repositories/StatisticsRepository";

export interface GameContext {
	letterSelectionRepository: LetterSelectionRepository;
	playerCipherRepository: PlayerCipherRepository;
	symbolSelectionRepository: SymbolSelectionRepository;
	cipherRepository: CipherRepository;
	gameHistoryRepository: GameHistoryRepository;
	achievementRepository: AchievementRepository;
	paragraphOfTheDayRepository: ParagraphOfTheDayRepository;
	dayRepository: DayRepository;
	discoveryOrderRepository: DiscoveryOrderRepository;
	statisticsRepository: StatisticsRepository;
}
