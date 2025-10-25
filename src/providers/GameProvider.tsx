import type React from "react";
import { GameContext } from "../contexts/GameContext";
import { createLetterSelection } from "../utils/createLetterSelection";
import { createPlayerCipher } from "../utils/createPlayerCipher";
import { createSymbolSelection } from "../utils/createSymbolSelection";
import { createCipherRepository } from "../utils/createCipherRepository";
import { createGameHistoryRepository } from "../utils/createGameHistoryRepository";
import { createAchievementRepository } from "../utils/createAchievementRepository";
import { createParagraphOfTheDayRepository } from "../utils/createParagraphOfTheDayRepository";
import { createDayRepository } from "../utils/createDayRepository";

interface GameProviderProps {
	children: React.ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }: GameProviderProps) => {
	const letterSelection = createLetterSelection();
	const playerCipher = createPlayerCipher();
	const symbolSelection = createSymbolSelection();
	const cipherRepository = createCipherRepository();
	const gameHistoryRepository = createGameHistoryRepository();
	const achievementRepository = createAchievementRepository();
	const paragraphOfTheDayRepository = createParagraphOfTheDayRepository();
	const dayRepository = createDayRepository();

	const value = {
		letterSelectionRepository: letterSelection,
		playerCipherRepository: playerCipher,
		symbolSelectionRepository: symbolSelection,
		cipherRepository: cipherRepository,
		gameHistoryRepository: gameHistoryRepository,
		achievementRepository: achievementRepository,
		paragraphOfTheDayRepository: paragraphOfTheDayRepository,
		dayRepository: dayRepository,
	};

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
