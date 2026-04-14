import type { AllGamesRepository } from "../repositories/AllGamesRepository";
import type { GameHistoryRepository } from "../repositories/GameHistoryRepository";
import type { AchievementRepository, TimeService } from "@deciphraze/core";
import type { ForcedDayRepository } from "../repositories/ForcedDayRepository";
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
	timeService: TimeService;
	forcedDayRepository: ForcedDayRepository;
	discoveryOrderRepository: DiscoveryOrderRepository;
	statisticsRepository: StatisticsRepository;
	associationHistoryRepository: AssociationHistoryRepository;
	settingsRepository: SettingsRepository;
	viewedAchievementsRepository: ViewedAchievementsRepository;
	browserService: BrowserService;
}
