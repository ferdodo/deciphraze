import type { GameContextType } from "../types/GameContextType";
import { createCipherRepository } from "../utils/createCipherRepository";
import { createLetterSelection } from "../utils/createLetterSelection";
import { createPlayerCipher } from "../utils/createPlayerCipher";
import { createSymbolSelection } from "../utils/createSymbolSelection";
import { createAchievementRepositoryMock } from "../mocks/createAchievementRepositoryMock";
import { createGameHistoryRepositoryMock } from "../mocks/createGameHistoryRepositoryMock";
import { createParagraphOfTheDayRepositoryMock } from "../mocks/createParagraphOfTheDayRepositoryMock";
import { createDayRepositoryMock } from "../mocks/createDayRepositoryMock";
import { createDiscoveryOrderRepositoryMock } from "../mocks/createDiscoveryOrderRepositoryMock";
import { createStatisticsRepository } from "../utils/createStatisticsRepository";
import { initializeGameSideEffects } from "../utils/initializeGameSideEffects";

export function withGameStarted(): [() => void, GameContextType] {
    const context: GameContextType = {
        letterSelectionRepository: createLetterSelection(),
        playerCipherRepository: createPlayerCipher(),
        symbolSelectionRepository: createSymbolSelection(),
        cipherRepository: createCipherRepository(),
        gameHistoryRepository: createGameHistoryRepositoryMock(),
        achievementRepository: createAchievementRepositoryMock(),
        paragraphOfTheDayRepository: createParagraphOfTheDayRepositoryMock(),
        dayRepository: createDayRepositoryMock(),
        discoveryOrderRepository: createDiscoveryOrderRepositoryMock(),
        statisticsRepository: createStatisticsRepository(),
    };

    const cleanup = initializeGameSideEffects(context);

    return [cleanup, context];
}