import { describe, it, expect } from "vitest";
import { withFinishedGame } from "../fixtures/withFinishedGame";

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

	it("should set firstGameDate and lastGameDate on first win", () => {
		const [cleanup, context] = withFinishedGame();
		
		const statistics = context.statisticsRepository.getStatistics();
		const today = context.dayRepository.getDay();
		
		expect(statistics.firstGameDate).toBe(today);
		expect(statistics.lastGameDate).toBe(today);
		
		cleanup();
	});

});

