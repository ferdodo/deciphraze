import { describe, it, expect } from "vitest";
import { withGameStarted } from "../fixtures/withGameStarted";
import { withFinishedGame } from "../fixtures/withFinishedGame";
import { asPlayerFinishGame } from "../automations/asPlayerFinishGame";

describe("updateStatistics", () => {
	it("should update statistics when a game is won", () => {
		const [cleanup, context] = withFinishedGame();
		
		const statistics = context.statisticsRepository.getStatistics();
		
		// Les statistiques devraient être mises à jour au moins une fois
		expect(statistics.totalGames).toBeGreaterThan(0);
		expect(statistics.totalWordsFound).toBeGreaterThan(0);
		expect(statistics.averageWordsPerGame).toBeGreaterThan(0);
		expect(statistics.firstGameDate).toBeTruthy();
		expect(statistics.lastGameDate).toBeTruthy();
		
		cleanup();
	});

	it("should record the first 5 letters of discovery order", () => {
		const [cleanup, context] = withFinishedGame();
		
		const statistics = context.statisticsRepository.getStatistics();
		const today = context.dayRepository.getDay();
		const discoveryOrder = context.discoveryOrderRepository.getDiscoveryOrder(today);
		
		// Il peut y avoir plusieurs entrées si plusieurs victoires ont été enregistrées
		// mais chaque entrée devrait contenir les 5 premières lettres
		expect(statistics.letterPositions.length).toBeGreaterThan(0);
		const lastEntry = statistics.letterPositions[statistics.letterPositions.length - 1];
		expect(lastEntry.length).toBeLessThanOrEqual(5);
		expect(lastEntry).toEqual(discoveryOrder.slice(0, 5));
		
		cleanup();
	});

	it("should not update statistics multiple times for the same day", () => {
		const [cleanup, context] = withGameStarted();
		
		// Première victoire
		asPlayerFinishGame(context);
		const statisticsBefore = context.statisticsRepository.getStatistics();
		const totalGamesBefore = statisticsBefore.totalGames;
		const letterPositionsBefore = statisticsBefore.letterPositions.length;
		
		// Attendre un peu pour s'assurer que toutes les mises à jour sont terminées
		// Puis simuler une autre tentative de victoire le même jour
		asPlayerFinishGame(context);
		
		const statisticsAfter = context.statisticsRepository.getStatistics();
		
		// Le nombre de parties ne devrait pas augmenter car c'est le même jour
		// (la protection lastWinDate devrait empêcher cela)
		expect(statisticsAfter.totalGames).toBe(totalGamesBefore);
		expect(statisticsAfter.letterPositions.length).toBe(letterPositionsBefore);
		
		cleanup();
	});

	it("should calculate average words per game correctly", () => {
		const [cleanup, context] = withFinishedGame();
		
		const statistics = context.statisticsRepository.getStatistics();
		const expectedAverage = statistics.totalWordsFound / statistics.totalGames;
		
		expect(statistics.averageWordsPerGame).toBe(expectedAverage);
		
		cleanup();
	});

	it("should set firstGameDate and lastGameDate on first win", () => {
		const [cleanup, context] = withFinishedGame();
		
		const statistics = context.statisticsRepository.getStatistics();
		const today = context.dayRepository.getDay();
		
		expect(statistics.firstGameDate).toBe(today);
		expect(statistics.lastGameDate).toBe(today);
		
		cleanup();
	});

});

