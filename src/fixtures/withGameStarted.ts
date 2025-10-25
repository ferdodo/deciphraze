import { GameContextType } from "../types/GameContextType";
import { createAchievementRepository } from "../utils/createAchievementRepository";
import { createCipherRepository } from "../utils/createCipherRepository";
import { createDayRepository } from "../utils/createDayRepository";
import { createGameHistoryRepository } from "../utils/createGameHistoryRepository";
import { createLetterSelection } from "../utils/createLetterSelection";
import { createParagraphOfTheDayRepository } from "../utils/createParagraphOfTheDayRepository";
import { createPlayerCipher } from "../utils/createPlayerCipher";
import { createSymbolSelection } from "../utils/createSymbolSelection";

export function withGameStarted(): GameContextType {
    return {
        letterSelectionRepository: createLetterSelection(),
        playerCipherRepository: createPlayerCipher(),
        symbolSelectionRepository: createSymbolSelection(),
        cipherRepository: createCipherRepository(),
        gameHistoryRepository: createGameHistoryRepository(),
        achievementRepository: createAchievementRepository(),
        paragraphOfTheDayRepository: createParagraphOfTheDayRepository(),
        dayRepository: createDayRepository(),
    }
}