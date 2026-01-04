import { describe, it, expect } from "vitest";
import { resetAllData } from "./resetAllData";
import { withGameStarted } from "../fixtures/withGameStarted";
import { createSettingsRepository } from "../utils/createSettingsRepository";
import { createLocalStorageMock } from "../utils/createLocalStorageMock";
import { createBrowserServiceMock } from "../mocks/createBrowserServiceMock";
import { createAllAchievements } from "../factories/createAllAchievements";

describe("resetAllData", () => {
	it("should not reset data when user cancels confirmation", () => {
		const [cleanup, context] = withGameStarted();
		
		// Ajouter settingsRepository au contexte
		const settingsRepository = createSettingsRepository(createLocalStorageMock());
		const contextWithSettings = {
			...context,
			settingsRepository,
		};

		// Créer un mock de browserService qui retourne false (annulation)
		let confirmCalled = false;
		const browserServiceMock = createBrowserServiceMock();
		browserServiceMock.confirm = (): boolean => {
			confirmCalled = true;
			return false;
		};
		contextWithSettings.browserService = browserServiceMock;

		// Ajouter des données dans les repositories
		contextWithSettings.letterSelectionRepository.selectLetter("A");
		contextWithSettings.playerCipherRepository.addPlayerCipherEntry("A", "X");
		contextWithSettings.symbolSelectionRepository.selectSymbol("X");
		contextWithSettings.gameHistoryRepository.addSession({
			winAt: "2024-01-01",
			lettersFound: ["A"],
			wordsFound: 10,
		});
		contextWithSettings.achievementRepository.saveAchievements(
			createAllAchievements(
				true, // firstGameUnlocked
				false, // streak5DaysUnlocked
				{ current: 0, target: 5 }, // streak5DaysProgress
				false, // firstLetterAUnlocked
				false, // firstLetterEUnlocked
				false, // firstLetterYUnlocked
				false, // wordInOrderUnlocked
				false, // alphaAndOmegaUnlocked
				false, // firstLetterQUnlocked
				false, // words1000Unlocked
				{ current: 0, target: 500 }, // words1000Progress
				false, // completeAlphabetUnlocked
				{ current: 0, target: 26 }, // completeAlphabetProgress
				false, // paleographerUnlocked
				false, // allVowelsInSequenceUnlocked
				"2024-01-01" // computedAtDate
			)
		);
		contextWithSettings.discoveryOrderRepository.addLetterToDiscoveryOrder("2024-01-01", "A");
		contextWithSettings.statisticsRepository.saveStatistics({
			totalGames: 5,
			totalWordsFound: 10,
			firstGameDate: "2024-01-01",
			lastGameDate: "2024-01-01",
			averageWordsPerGame: 2,
			letterPositions: [],
			lastUpdated: "2024-01-01",
		});
		contextWithSettings.associationHistoryRepository.addAssociation("2024-01-01", "A", "X", true);
		contextWithSettings.settingsRepository.saveSettings({
			pullToRefreshEnabled: false,
		});

		// Appeler resetAllData
		resetAllData(contextWithSettings);

		// Vérifier que confirm a été appelé
		expect(confirmCalled).toBe(true);

		// Vérifier que les données n'ont pas été réinitialisées
		expect(contextWithSettings.letterSelectionRepository.getLetterSelection()).toBe("A");
		expect(contextWithSettings.playerCipherRepository.getPlayerCipher().A).toBe("X");
		expect(contextWithSettings.symbolSelectionRepository.getSymbolSelection()).toBe("X");
		expect(Object.keys(contextWithSettings.gameHistoryRepository.getHistory()).length).toBeGreaterThan(0);
		expect(contextWithSettings.achievementRepository.loadAchievements().achievements.firstGame.unlocked).toBe(true);
		expect(contextWithSettings.discoveryOrderRepository.getDiscoveryOrder("2024-01-01").length).toBeGreaterThan(0);
		expect(contextWithSettings.statisticsRepository.getStatistics().totalGames).toBe(5);
		expect(contextWithSettings.associationHistoryRepository.getHistory("2024-01-01").length).toBeGreaterThan(0);
		expect(contextWithSettings.settingsRepository.getSettings().pullToRefreshEnabled).toBe(false);

		cleanup();
	});

	it("should reset all data when user confirms", () => {
		const [cleanup, context] = withGameStarted();
		
		// Ajouter settingsRepository au contexte
		const settingsRepository = createSettingsRepository(createLocalStorageMock());
		const contextWithSettings = {
			...context,
			settingsRepository,
		};

		// Créer un mock de browserService qui retourne true (confirmation)
		let confirmCalled = false;
		const browserServiceMock = createBrowserServiceMock();
		browserServiceMock.confirm = (): boolean => {
			confirmCalled = true;
			return true;
		};
		contextWithSettings.browserService = browserServiceMock;

		// Ajouter des données dans les repositories
		contextWithSettings.letterSelectionRepository.selectLetter("A");
		contextWithSettings.playerCipherRepository.addPlayerCipherEntry("A", "X");
		contextWithSettings.symbolSelectionRepository.selectSymbol("X");
		contextWithSettings.gameHistoryRepository.addSession({
			winAt: "2024-01-01",
			lettersFound: ["A"],
			wordsFound: 10,
		});
		contextWithSettings.achievementRepository.saveAchievements(
			createAllAchievements(
				true, // firstGameUnlocked
				false, // streak5DaysUnlocked
				{ current: 0, target: 5 }, // streak5DaysProgress
				false, // firstLetterAUnlocked
				false, // firstLetterEUnlocked
				false, // firstLetterYUnlocked
				false, // wordInOrderUnlocked
				false, // alphaAndOmegaUnlocked
				false, // firstLetterQUnlocked
				false, // words1000Unlocked
				{ current: 0, target: 500 }, // words1000Progress
				false, // completeAlphabetUnlocked
				{ current: 0, target: 26 }, // completeAlphabetProgress
				false, // paleographerUnlocked
				false, // allVowelsInSequenceUnlocked
				"2024-01-01" // computedAtDate
			)
		);
		contextWithSettings.discoveryOrderRepository.addLetterToDiscoveryOrder("2024-01-01", "A");
		contextWithSettings.statisticsRepository.saveStatistics({
			totalGames: 5,
			totalWordsFound: 10,
			firstGameDate: "2024-01-01",
			lastGameDate: "2024-01-01",
			averageWordsPerGame: 2,
			letterPositions: [],
			lastUpdated: "2024-01-01",
		});
		contextWithSettings.associationHistoryRepository.addAssociation("2024-01-01", "A", "X", true);
		contextWithSettings.settingsRepository.saveSettings({
			pullToRefreshEnabled: false,
		});

		// Appeler resetAllData
		resetAllData(contextWithSettings);

		// Vérifier que confirm a été appelé
		expect(confirmCalled).toBe(true);

		// Vérifier que toutes les données ont été réinitialisées
		expect(contextWithSettings.letterSelectionRepository.getLetterSelection()).toBeNull();
		expect(Object.keys(contextWithSettings.playerCipherRepository.getPlayerCipher()).length).toBe(0);
		expect(contextWithSettings.symbolSelectionRepository.getSymbolSelection()).toBeNull();
		expect(Object.keys(contextWithSettings.gameHistoryRepository.getHistory()).length).toBe(0);
		expect(contextWithSettings.achievementRepository.loadAchievements().achievements.firstGame.unlocked).toBe(false);
		expect(contextWithSettings.discoveryOrderRepository.getDiscoveryOrder("2024-01-01").length).toBe(0);
		expect(contextWithSettings.statisticsRepository.getStatistics().totalGames).toBe(0);
		expect(contextWithSettings.associationHistoryRepository.getHistory("2024-01-01").length).toBe(0);
		expect(contextWithSettings.settingsRepository.getSettings().pullToRefreshEnabled).toBe(true); // Valeur par défaut

		cleanup();
	});
});

