import { describe, it, expect } from "vitest";
import { createStatisticsRepository } from "./createStatisticsRepository";
import type { Statistics } from "@deciphraze/core";
import { createLocalStorageMock } from "./createLocalStorageMock";

describe("createStatisticsRepository", () => {
	it("should load valid statistics from localStorage", () => {
		const storage = createLocalStorageMock();
		const validStats: Statistics = {
			totalGames: 5,
			totalWordsFound: 100,
			firstGameDate: "2024-01-01",
			lastGameDate: "2024-01-05",
			averageWordsPerGame: 20,
			letterPositions: [["A", "B", "C"], ["D", "E"]],
			lastUpdated: "2024-01-05T00:00:00.000Z"
		};
		storage.setItem("deciphraze_statistics", JSON.stringify(validStats));

		const repository = createStatisticsRepository(storage);
		const statistics = repository.getStatistics();

		expect(statistics.totalGames).toBe(5);
		expect(statistics.totalWordsFound).toBe(100);
		expect(statistics.firstGameDate).toBe("2024-01-01");
		expect(statistics.lastGameDate).toBe("2024-01-05");
		expect(statistics.averageWordsPerGame).toBe(20);
		expect(statistics.letterPositions).toEqual([["A", "B", "C"], ["D", "E"]]);
	});

	it("should use default values for invalid statistics fields", () => {
		const storage = createLocalStorageMock();
		const invalidStats = {
			totalGames: "not a number",
			totalWordsFound: null,
			firstGameDate: 123,
			lastGameDate: undefined,
			averageWordsPerGame: "invalid",
			letterPositions: "not an array",
			lastUpdated: null
		};
		storage.setItem("deciphraze_statistics", JSON.stringify(invalidStats));

		const repository = createStatisticsRepository(storage);
		const statistics = repository.getStatistics();

		expect(statistics.totalGames).toBe(0);
		expect(statistics.totalWordsFound).toBe(0);
		expect(statistics.firstGameDate).toBeNull();
		expect(statistics.lastGameDate).toBeNull();
		expect(statistics.averageWordsPerGame).toBe(0);
		expect(statistics.letterPositions).toEqual([]);
		expect(statistics.lastUpdated).toBeTruthy();
	});


	it("should save and retrieve statistics", () => {
		const storage = createLocalStorageMock();
		const repository = createStatisticsRepository(storage);
		const newStats: Statistics = {
			totalGames: 3,
			totalWordsFound: 50,
			firstGameDate: "2024-01-01",
			lastGameDate: "2024-01-03",
			averageWordsPerGame: 16.67,
			letterPositions: [["A", "B"], ["C", "D", "E"]],
			lastUpdated: "2024-01-01T00:00:00.000Z"
		};

		repository.saveStatistics(newStats);
		const savedStats = repository.getStatistics();

		expect(savedStats.totalGames).toBe(3);
		expect(savedStats.totalWordsFound).toBe(50);
		expect(savedStats.firstGameDate).toBe("2024-01-01");
		expect(savedStats.lastGameDate).toBe("2024-01-03");
		expect(savedStats.averageWordsPerGame).toBe(16.67);
		expect(savedStats.letterPositions).toEqual([["A", "B"], ["C", "D", "E"]]);
		expect(savedStats.lastUpdated).toBeTruthy();
		expect(savedStats.lastUpdated).not.toBe("2024-01-01T00:00:00.000Z"); // Should be updated
	});


	it("should handle JSON parse errors gracefully", () => {
		const storage = createLocalStorageMock();
		storage.setItem("deciphraze_statistics", "invalid json{");

		const repository = createStatisticsRepository(storage);
		const statistics = repository.getStatistics();

		// Should fall back to default statistics
		expect(statistics.totalGames).toBe(0);
		expect(statistics.letterPositions).toEqual([]);
	});

	it("should handle non-object parsed data", () => {
		const storage = createLocalStorageMock();
		storage.setItem("deciphraze_statistics", '"just a string"');

		const repository = createStatisticsRepository(storage);
		const statistics = repository.getStatistics();

		expect(statistics.totalGames).toBe(0);
		expect(statistics.letterPositions).toEqual([]);
	});

});

