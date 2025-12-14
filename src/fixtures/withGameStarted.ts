import type { GameContextType } from "../types/GameContextType";
import { createLetterSelection } from "../utils/createLetterSelection";
import { createPlayerCipher } from "../utils/createPlayerCipher";
import { createSymbolSelection } from "../utils/createSymbolSelection";
import { createAchievementRepositoryMock } from "../mocks/createAchievementRepositoryMock";
import { createGameHistoryRepositoryMock } from "../mocks/createGameHistoryRepositoryMock";
import { createDayRepositoryMock } from "../mocks/createDayRepositoryMock";
import { createDiscoveryOrderRepositoryMock } from "../mocks/createDiscoveryOrderRepositoryMock";
import { createAssociationHistoryRepositoryMock } from "../mocks/createAssociationHistoryRepositoryMock";
import { createStatisticsRepository } from "../utils/createStatisticsRepository";
import { initializeGameSideEffects } from "../utils/initializeGameSideEffects";

export function withGameStarted(): [() => void, GameContextType] {
    const dayRepository = createDayRepositoryMock();
    const context: GameContextType = {
        letterSelectionRepository: createLetterSelection(),
        playerCipherRepository: createPlayerCipher(),
        symbolSelectionRepository: createSymbolSelection(),
        gameHistoryRepository: createGameHistoryRepositoryMock(),
        achievementRepository: createAchievementRepositoryMock(),
        dayRepository,
        discoveryOrderRepository: createDiscoveryOrderRepositoryMock(),
        statisticsRepository: createStatisticsRepository(),
        associationHistoryRepository: createAssociationHistoryRepositoryMock(),
    };

    const cleanup = initializeGameSideEffects(context);

    return [cleanup, context];
}