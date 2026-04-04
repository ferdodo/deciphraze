import type React from "react";
import { useEffect, useMemo } from "react";
import { gameContext } from "./gameContext";
import { createAllGamesRepository } from "../utils/createAllGamesRepository";
import { createGameHistoryRepository } from "../utils/createGameHistoryRepository";
import { createAllAchievementsV5Repository } from "@deciphraze/persistance";
import { createDayRepository } from "../utils/createDayRepository";
import { createDiscoveryOrderRepository } from "../utils/createDiscoveryOrderRepository";
import { createStatisticsRepository } from "../utils/createStatisticsRepository";
import { createAssociationHistoryRepository } from "../utils/createAssociationHistoryRepository";
import { createSettingsRepository } from "../utils/createSettingsRepository";
import { createViewedAchievementsRepository } from "../utils/createViewedAchievementsRepository";
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
			allGamesRepository: createAllGamesRepository(storage),
			gameHistoryRepository: createGameHistoryRepository(storage),
			achievementRepository: createAllAchievementsV5Repository(),
			dayRepository: createDayRepository(),
			discoveryOrderRepository: createDiscoveryOrderRepository(storage),
			statisticsRepository: createStatisticsRepository(storage),
			associationHistoryRepository: createAssociationHistoryRepository(storage),
			settingsRepository,
			viewedAchievementsRepository: createViewedAchievementsRepository(storage),
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
