import type { GameContextType } from "../types/GameContextType";
import { createAllGamesRepositoryMock } from "../mocks/createAllGamesRepositoryMock";
import { createAchievementRepositoryMock } from "../mocks/createAchievementRepositoryMock";
import { createGameHistoryRepositoryMock } from "../mocks/createGameHistoryRepositoryMock";
import { createForcedDayRepositoryMock } from "../mocks/createForcedDayRepositoryMock";
import { createDiscoveryOrderRepositoryMock } from "../mocks/createDiscoveryOrderRepositoryMock";
import { createAssociationHistoryRepositoryMock } from "../mocks/createAssociationHistoryRepositoryMock";
import { createStatisticsRepository } from "../utils/createStatisticsRepository";
import { createSettingsRepository } from "../utils/createSettingsRepository";
import { createViewedAchievementsRepository } from "../utils/createViewedAchievementsRepository";
import { createChallengeRepository } from "../utils/createChallengeRepository";
import { createChallengeCodesRepository } from "../utils/createChallengeCodesRepository";
import { createChallengeContextRepository } from "../utils/createChallengeContextRepository";
import { createRandomService } from "../utils/createRandomService";
import { initializeGameSideEffects } from "../utils/initializeGameSideEffects";
import { createLocalStorageMock } from "../utils/createLocalStorageMock";
import { createBrowserServiceMock } from "../mocks/createBrowserServiceMock";
import { createTimeService } from "@deciphraze/browser";

export function withGameStarted(): [() => void, GameContextType] {
	const timeService = createTimeService();
	const forcedDayRepository = createForcedDayRepositoryMock();
	const storage = createLocalStorageMock();
	const context: GameContextType = {
		allGamesRepository: createAllGamesRepositoryMock(),
		gameHistoryRepository: createGameHistoryRepositoryMock(),
		achievementRepository: createAchievementRepositoryMock(),
		timeService,
		randomService: createRandomService(),
		forcedDayRepository,
		discoveryOrderRepository: createDiscoveryOrderRepositoryMock(),
		statisticsRepository: createStatisticsRepository(storage),
		associationHistoryRepository: createAssociationHistoryRepositoryMock(),
		settingsRepository: createSettingsRepository(storage),
		viewedAchievementsRepository: createViewedAchievementsRepository(storage),
		challengeRepository: createChallengeRepository(storage),
		challengeCodesRepository: createChallengeCodesRepository(storage),
		challengeContextRepository: createChallengeContextRepository(),
		browserService: createBrowserServiceMock(),
	};

	const cleanup = initializeGameSideEffects(context);

	return [cleanup, context];
}
