import type React from "react";
import { useEffect, useMemo } from "react";
import { gameContext } from "./gameContext";
import { createLetterSelection } from "../utils/createLetterSelection";
import { createPlayerCipher } from "../utils/createPlayerCipher";
import { createSymbolSelection } from "../utils/createSymbolSelection";
import { createGameHistoryRepository } from "../utils/createGameHistoryRepository";
import { createAchievementRepository } from "../utils/createAchievementRepository";
import { createDayRepository } from "../utils/createDayRepository";
import { createDiscoveryOrderRepository } from "../utils/createDiscoveryOrderRepository";
import { createStatisticsRepository } from "../utils/createStatisticsRepository";
import { createAssociationHistoryRepository } from "../utils/createAssociationHistoryRepository";
import { initializeGameSideEffects } from "../utils/initializeGameSideEffects";
import { getDefaultStorage } from "../utils/getDefaultStorage";
import { createLocalStorageMock } from "../utils/createLocalStorageMock";

interface GameContextProviderProps {
	children: React.ReactNode;
}

export function GameContextProvider({ children }: GameContextProviderProps): JSX.Element {
	const value = useMemo(() => {
		const storage = getDefaultStorage() ?? createLocalStorageMock();
		return {
			letterSelectionRepository: createLetterSelection(),
			playerCipherRepository: createPlayerCipher(),
			symbolSelectionRepository: createSymbolSelection(),
			gameHistoryRepository: createGameHistoryRepository(storage),
			achievementRepository: createAchievementRepository(storage),
			dayRepository: createDayRepository(),
			discoveryOrderRepository: createDiscoveryOrderRepository(storage),
			statisticsRepository: createStatisticsRepository(storage),
			associationHistoryRepository: createAssociationHistoryRepository(storage),
		};
	}, []);

	// Initialiser les effets de bord du jeu
	useEffect(() => {
		const cleanup = initializeGameSideEffects(value);
		return cleanup;
	}, [value]);

	return <gameContext.Provider value={value}>{children}</gameContext.Provider>;
};
