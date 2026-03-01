import type { GameContextType } from "../types/GameContextType";
import { createAllGamesRepositoryMock } from "../mocks/createAllGamesRepositoryMock";
import { createAchievementRepositoryMock } from "../mocks/createAchievementRepositoryMock";
import { createGameHistoryRepositoryMock } from "../mocks/createGameHistoryRepositoryMock";
import { createDayRepositoryMock } from "../mocks/createDayRepositoryMock";
import { createDiscoveryOrderRepositoryMock } from "../mocks/createDiscoveryOrderRepositoryMock";
import { createAssociationHistoryRepositoryMock } from "../mocks/createAssociationHistoryRepositoryMock";
import { createStatisticsRepository } from "../utils/createStatisticsRepository";
import { createSettingsRepository } from "../utils/createSettingsRepository";
import { createViewedAchievementsRepository } from "../utils/createViewedAchievementsRepository";
import { initializeGameSideEffects } from "../utils/initializeGameSideEffects";
import { createLocalStorageMock } from "../utils/createLocalStorageMock";
import { createBrowserServiceMock } from "../mocks/createBrowserServiceMock";

export function withGameStarted(): [() => void, GameContextType] {
    const dayRepository = createDayRepositoryMock();
    const storage = createLocalStorageMock();
    const context: GameContextType = {
        allGamesRepository: createAllGamesRepositoryMock(),
        gameHistoryRepository: createGameHistoryRepositoryMock(),
        achievementRepository: createAchievementRepositoryMock(),
        dayRepository,
        discoveryOrderRepository: createDiscoveryOrderRepositoryMock(),
        statisticsRepository: createStatisticsRepository(storage),
        associationHistoryRepository: createAssociationHistoryRepositoryMock(),
        settingsRepository: createSettingsRepository(storage),
        viewedAchievementsRepository: createViewedAchievementsRepository(storage),
        browserService: createBrowserServiceMock(),
    };

    const cleanup = initializeGameSideEffects(context);

    return [cleanup, context];
}