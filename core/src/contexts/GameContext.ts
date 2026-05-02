import type { AllGamesRepository } from "../repositories/AllGamesRepository";
import type { GameHistoryRepository } from "../repositories/GameHistoryRepository";
import type { AchievementRepository } from "../repositories/AchievementRepository";
import type { TimeService } from "../services/TimeService";
import type { RandomService } from "../services/RandomService";
import type { ForcedDayRepository } from "../repositories/ForcedDayRepository";
import type { DiscoveryOrderRepository } from "../repositories/DiscoveryOrderRepository";
import type { StatisticsRepository } from "../repositories/StatisticsRepository";
import type { AssociationHistoryRepository } from "../repositories/AssociationHistoryRepository";
import type { SettingsRepository } from "../repositories/SettingsRepository";
import type { ViewedAchievementsRepository } from "../repositories/ViewedAchievementsRepository";
import type { ChallengeRepository } from "../repositories/ChallengeRepository";
import type { ChallengeCodesRepository } from "../repositories/ChallengeCodesRepository";
import type { ChallengeContextRepository } from "../repositories/ChallengeContextRepository";
import type { BrowserService } from "../services/BrowserService";

export interface GameContext {
	allGamesRepository: AllGamesRepository;
	gameHistoryRepository: GameHistoryRepository;
	achievementRepository: AchievementRepository;
	timeService: TimeService;
	randomService: RandomService;
	forcedDayRepository: ForcedDayRepository;
	discoveryOrderRepository: DiscoveryOrderRepository;
	statisticsRepository: StatisticsRepository;
	associationHistoryRepository: AssociationHistoryRepository;
	settingsRepository: SettingsRepository;
	viewedAchievementsRepository: ViewedAchievementsRepository;
	challengeRepository: ChallengeRepository;
	challengeCodesRepository: ChallengeCodesRepository;
	challengeContextRepository: ChallengeContextRepository;
	browserService: BrowserService;
}
