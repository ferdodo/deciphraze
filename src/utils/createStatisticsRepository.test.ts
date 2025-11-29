import { describe, it, expect } from "vitest";
import { createStatisticsRepository } from "./createStatisticsRepository";
import type { Statistics } from "../types/Statistics";

describe("createStatisticsRepository", () => {

	it("should create repository with default statistics when localStorage is empty", () => {
		localStorage.clear();
		const repository = createStatisticsRepository();
		const statistics = repository.getStatistics();

		expect(statistics.totalGames).toBe(0);
		expect(statistics.totalWordsFound).toBe(0);
		expect(statistics.firstGameDate).toBeNull();
		expect(statistics.lastGameDate).toBeNull();
		expect(statistics.averageWordsPerGame).toBe(0);
		expect(statistics.letterPositions).toEqual([]);
		expect(statistics.lastUpdated).toBeTruthy();
	});

	it("should create repository with default statistics when localStorage contains 'null'", () => {
		localStorage.clear();
		localStorage.setItem("deciphraze_statistics", "null");
		const repository = createStatisticsRepository();
		const statistics = repository.getStatistics();

		expect(statistics.totalGames).toBe(0);
		expect(statistics.letterPositions).toEqual([]);
	});

	it("should load valid statistics from localStorage", () => {
		localStorage.clear();
		const validStats: Statistics = {
			totalGames: 5,
			totalWordsFound: 100,
			firstGameDate: "2024-01-01",
			lastGameDate: "2024-01-05",
			averageWordsPerGame: 20,
			letterPositions: [["A", "B", "C"], ["D", "E"]],
			lastUpdated: "2024-01-05T00:00:00.000Z"
		};
		localStorage.setItem("deciphraze_statistics", JSON.stringify(validStats));

		const repository = createStatisticsRepository();
		const statistics = repository.getStatistics();

		expect(statistics.totalGames).toBe(5);
		expect(statistics.totalWordsFound).toBe(100);
		expect(statistics.firstGameDate).toBe("2024-01-01");
		expect(statistics.lastGameDate).toBe("2024-01-05");
		expect(statistics.averageWordsPerGame).toBe(20);
		expect(statistics.letterPositions).toEqual([["A", "B", "C"], ["D", "E"]]);
	});

	it("should use default values for invalid statistics fields", () => {
		localStorage.clear();
		const invalidStats = {
			totalGames: "not a number",
			totalWordsFound: null,
			firstGameDate: 123,
			lastGameDate: undefined,
			averageWordsPerGame: "invalid",
			letterPositions: "not an array",
			lastUpdated: null
		};
		localStorage.setItem("deciphraze_statistics", JSON.stringify(invalidStats));

		const repository = createStatisticsRepository();
		const statistics = repository.getStatistics();

		expect(statistics.totalGames).toBe(0);
		expect(statistics.totalWordsFound).toBe(0);
		expect(statistics.firstGameDate).toBeNull();
		expect(statistics.lastGameDate).toBeNull();
		expect(statistics.averageWordsPerGame).toBe(0);
		expect(statistics.letterPositions).toEqual([]);
		expect(statistics.lastUpdated).toBeTruthy();
	});

	it("should filter invalid entries from letterPositions", () => {
		localStorage.clear();
		const statsWithInvalidLetterPositions = {
			totalGames: 1,
			totalWordsFound: 10,
			firstGameDate: null,
			lastGameDate: null,
			averageWordsPerGame: 10,
			letterPositions: [
				["A", "B", "C"],
				["D", 123, "E"], // Invalid: contains number
				"not an array", // Invalid: not an array
				["F", "G"],
				[null, "H"] // Invalid: contains null
			],
			lastUpdated: "2024-01-01T00:00:00.000Z"
		};
		localStorage.setItem("deciphraze_statistics", JSON.stringify(statsWithInvalidLetterPositions));

		const repository = createStatisticsRepository();
		const statistics = repository.getStatistics();

		expect(statistics.letterPositions).toEqual([["A", "B", "C"], ["F", "G"]]);
	});

	it("should save and retrieve statistics", () => {
		localStorage.clear();
		const repository = createStatisticsRepository();
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

	it("should update lastUpdated when saving statistics", () => {
		localStorage.clear();
		const repository = createStatisticsRepository();
		const stats1: Statistics = {
			totalGames: 1,
			totalWordsFound: 10,
			firstGameDate: null,
			lastGameDate: null,
			averageWordsPerGame: 10,
			letterPositions: [],
			lastUpdated: "2024-01-01T00:00:00.000Z"
		};

		repository.saveStatistics(stats1);

		const stats2: Statistics = {
			...stats1,
			totalGames: 2
		};
		repository.saveStatistics(stats2);
		const saved2 = repository.getStatistics();

		// lastUpdated should be updated (new timestamp)
		expect(saved2.lastUpdated).toBeTruthy();
		expect(saved2.lastUpdated).not.toBe(stats1.lastUpdated);
		// Verify that lastUpdated is a valid ISO string
		expect(() => new Date(saved2.lastUpdated)).not.toThrow();
		expect(new Date(saved2.lastUpdated).getTime()).toBeGreaterThan(0);
	});

	it("should persist statistics to localStorage", () => {
		localStorage.clear();
		const repository = createStatisticsRepository();
		const newStats: Statistics = {
			totalGames: 2,
			totalWordsFound: 30,
			firstGameDate: "2024-01-01",
			lastGameDate: "2024-01-02",
			averageWordsPerGame: 15,
			letterPositions: [["A", "B"]],
			lastUpdated: "2024-01-01T00:00:00.000Z"
		};

		repository.saveStatistics(newStats);

		const stored = localStorage.getItem("deciphraze_statistics");
		expect(stored).toBeTruthy();
		if (stored) {
			const parsed = JSON.parse(stored);
			expect(parsed.totalGames).toBe(2);
			expect(parsed.letterPositions).toEqual([["A", "B"]]);
		}
	});

	it("should emit statistics through observable", () => {
		localStorage.clear();
		const repository = createStatisticsRepository();
		const newStats: Statistics = {
			totalGames: 1,
			totalWordsFound: 20,
			firstGameDate: null,
			lastGameDate: null,
			averageWordsPerGame: 20,
			letterPositions: [["A"]],
			lastUpdated: "2024-01-01T00:00:00.000Z"
		};

		return new Promise<void>((resolve) => {
			repository.statistics$.subscribe((stats) => {
				expect(stats.totalGames).toBe(1);
				expect(stats.letterPositions).toEqual([["A"]]);
				resolve();
			});

			repository.saveStatistics(newStats);
		});
	});

	it("should handle JSON parse errors gracefully", () => {
		localStorage.clear();
		localStorage.setItem("deciphraze_statistics", "invalid json{");

		const repository = createStatisticsRepository();
		const statistics = repository.getStatistics();

		// Should fall back to default statistics
		expect(statistics.totalGames).toBe(0);
		expect(statistics.letterPositions).toEqual([]);
	});

	it("should handle non-object parsed data", () => {
		localStorage.clear();
		localStorage.setItem("deciphraze_statistics", '"just a string"');

		const repository = createStatisticsRepository();
		const statistics = repository.getStatistics();

		expect(statistics.totalGames).toBe(0);
		expect(statistics.letterPositions).toEqual([]);
	});

	it("should handle null firstGameDate and lastGameDate", () => {
		localStorage.clear();
		const statsWithNullDates: Statistics = {
			totalGames: 1,
			totalWordsFound: 10,
			firstGameDate: null,
			lastGameDate: null,
			averageWordsPerGame: 10,
			letterPositions: [],
			lastUpdated: "2024-01-01T00:00:00.000Z"
		};
		localStorage.setItem("deciphraze_statistics", JSON.stringify(statsWithNullDates));

		const repository = createStatisticsRepository();
		const statistics = repository.getStatistics();

		expect(statistics.firstGameDate).toBeNull();
		expect(statistics.lastGameDate).toBeNull();
	});
});

