import type React from "react";
import { useEffect, useMemo } from "react";
import { gameContext } from "./gameContext";
import { createAllGamesRepository } from "../utils/createAllGamesRepository";
import { createGameHistoryRepository } from "../utils/createGameHistoryRepository";
import { createAllAchievementsV7Repository } from "@deciphraze/persistance";
import { createDiscoveryOrderRepository } from "../utils/createDiscoveryOrderRepository";
import { createStatisticsRepository } from "../utils/createStatisticsRepository";
import { createAssociationHistoryRepository } from "../utils/createAssociationHistoryRepository";
import { createSettingsRepository } from "../utils/createSettingsRepository";
import { createViewedAchievementsRepository } from "../utils/createViewedAchievementsRepository";
import { createForcedDayRepository } from "../utils/createForcedDayRepository";
import { createChallengeRepository } from "../utils/createChallengeRepository";
import { createChallengeCodesRepository } from "../utils/createChallengeCodesRepository";
import { createChallengeContextRepository } from "../utils/createChallengeContextRepository";
import { createRandomService } from "../utils/createRandomService";
import { initializeGameSideEffects } from "../utils/initializeGameSideEffects";
import { getDefaultStorage } from "../utils/getDefaultStorage";
import { createLocalStorageMock } from "../utils/createLocalStorageMock";
import { createTimeService, getBrowserService } from "@deciphraze/browser";

interface GameContextProviderProps {
	children: React.ReactNode;
}

export function GameContextProvider({ children }: GameContextProviderProps): React.JSX.Element {
	const value = useMemo(() => {
		const storage = getDefaultStorage() ?? createLocalStorageMock();
		const settingsRepository = createSettingsRepository(storage);
		const browserService = getBrowserService();
		const timeService = createTimeService();
		const forcedDayRepository = createForcedDayRepository();
		
		// Appliquer les paramètres au démarrage
		const settings = settingsRepository.getSettings();
		browserService.applyPullToRefresh(settings.pullToRefreshEnabled);
		
		return {
			allGamesRepository: createAllGamesRepository(storage),
			gameHistoryRepository: createGameHistoryRepository(storage),
			achievementRepository: createAllAchievementsV7Repository(),
			timeService,
			randomService: createRandomService(),
			forcedDayRepository,
			discoveryOrderRepository: createDiscoveryOrderRepository(storage),
			statisticsRepository: createStatisticsRepository(storage),
			associationHistoryRepository: createAssociationHistoryRepository(storage),
			settingsRepository,
			viewedAchievementsRepository: createViewedAchievementsRepository(storage),
			challengeRepository: createChallengeRepository(storage),
			challengeCodesRepository: createChallengeCodesRepository(storage),
			challengeContextRepository: createChallengeContextRepository(),
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
