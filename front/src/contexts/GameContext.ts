import type { AllGamesRepository } from "../repositories/AllGamesRepository";
import type { GameHistoryRepository } from "../repositories/GameHistoryRepository";
import type { AchievementRepository } from "@deciphraze/core";
import type { DayRepository } from "../repositories/DayRepository";
import type { DiscoveryOrderRepository } from "../repositories/DiscoveryOrderRepository";
import type { StatisticsRepository } from "../repositories/StatisticsRepository";
import type { AssociationHistoryRepository } from "../repositories/AssociationHistoryRepository";
import type { SettingsRepository } from "../repositories/SettingsRepository";
import type { ViewedAchievementsRepository } from "../repositories/ViewedAchievementsRepository";
import type { BrowserService } from "../services/BrowserService";

export interface GameContext {
	allGamesRepository: AllGamesRepository;
	gameHistoryRepository: GameHistoryRepository;
	achievementRepository: AchievementRepository;
	dayRepository: DayRepository;
	discoveryOrderRepository: DiscoveryOrderRepository;
	statisticsRepository: StatisticsRepository;
	associationHistoryRepository: AssociationHistoryRepository;
	settingsRepository: SettingsRepository;
	viewedAchievementsRepository: ViewedAchievementsRepository;
	browserService: BrowserService;
}
