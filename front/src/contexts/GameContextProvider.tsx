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
import { createSettingsRepository } from "../utils/createSettingsRepository";
import { initializeGameSideEffects } from "../utils/initializeGameSideEffects";
import { getDefaultStorage } from "../utils/getDefaultStorage";
import { createLocalStorageMock } from "../utils/createLocalStorageMock";
import { getBrowserService } from "@deciphraze/browser";

interface GameContextProviderProps {
	children: React.ReactNode;
}

export function GameContextProvider({ children }: GameContextProviderProps): React.JSX.Element {
	const value = useMemo(() => {
		const storage = getDefaultStorage() ?? createLocalStorageMock();
		const settingsRepository = createSettingsRepository(storage);
		const browserService = getBrowserService();
		
		// Appliquer les paramètres au démarrage
		const settings = settingsRepository.getSettings();
		browserService.applyPullToRefresh(settings.pullToRefreshEnabled);
		
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
			settingsRepository,
			browserService,
		};
	}, []);

	// Écouter les changements de settings pour appliquer au BrowserService
	useEffect(() => {
		const subscription = value.settingsRepository.settings$.subscribe((newSettings) => {
			value.browserService.applyPullToRefresh(newSettings.pullToRefreshEnabled);
		});
		return () => subscription.unsubscribe();
	}, [value]);

	// Initialiser les effets de bord du jeu
	useEffect(() => {
		const cleanup = initializeGameSideEffects(value);
		return cleanup;
	}, [value]);

	return <gameContext.Provider value={value}>{children}</gameContext.Provider>;
};
