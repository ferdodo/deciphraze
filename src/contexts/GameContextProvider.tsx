import type React from "react";
import { useEffect, useMemo } from "react";
import { gameContext } from "./gameContext";
import { createLetterSelection } from "../utils/createLetterSelection";
import { createPlayerCipher } from "../utils/createPlayerCipher";
import { createSymbolSelection } from "../utils/createSymbolSelection";
import { createCipherRepository } from "../utils/createCipherRepository";
import { createGameHistoryRepository } from "../utils/createGameHistoryRepository";
import { createAchievementRepository } from "../utils/createAchievementRepository";
import { createParagraphOfTheDayRepository } from "../utils/createParagraphOfTheDayRepository";
import { createDayRepository } from "../utils/createDayRepository";
import { createDiscoveryOrderRepository } from "../utils/createDiscoveryOrderRepository";
import { createStatisticsRepository } from "../utils/createStatisticsRepository";
import { initializeGameSideEffects } from "../utils/initializeGameSideEffects";

interface GameContextProviderProps {
	children: React.ReactNode;
}

export function GameContextProvider({ children }: GameContextProviderProps): JSX.Element {
	const value = useMemo(() => ({
		letterSelectionRepository: createLetterSelection(),
		playerCipherRepository: createPlayerCipher(),
		symbolSelectionRepository: createSymbolSelection(),
		cipherRepository: createCipherRepository(),
		gameHistoryRepository: createGameHistoryRepository(),
		achievementRepository: createAchievementRepository(),
		paragraphOfTheDayRepository: createParagraphOfTheDayRepository(),
		dayRepository: createDayRepository(),
		discoveryOrderRepository: createDiscoveryOrderRepository(),
		statisticsRepository: createStatisticsRepository(),
	}), []);

	// Initialiser les effets de bord du jeu
	useEffect(() => {
		const cleanup = initializeGameSideEffects(value);
		return cleanup;
	}, [value]);

	return <gameContext.Provider value={value}>{children}</gameContext.Provider>;
};
