import { describe, it, expect } from "vitest";
import { createGameHistoryService } from "./createGameHistoryService";

// Mock localStorage
const localStorageMock = (() => {
	let store: Record<string, string> = {};

	return {
		getItem: (key: string) => store[key] || null,
		setItem: (key: string, value: string) => {
			store[key] = value;
		},
		removeItem: (key: string) => {
			delete store[key];
		},
		clear: () => {
			store = {};
		},
	};
})();

Object.defineProperty(globalThis, "localStorage", {
	value: localStorageMock,
});

describe("createGameHistoryService", () => {
	describe("Initialization", () => {
		it("should create empty history when no saved data exists", () => {
			localStorageMock.clear();
			const historyService = createGameHistoryService();
			const history = historyService.getGameHistory();

			expect(history.size).toBe(0);
		});

		it("should restore history from localStorage when saved data exists", () => {
			localStorageMock.clear();
			const savedData = [
				["2024-01-15", ["A", "B", "C"]],
				["2024-01-16", ["D", "E"]],
			];
			localStorageMock.setItem(
				"deciphraze-game-history",
				JSON.stringify(savedData),
			);

			const historyService = createGameHistoryService();
			const history = historyService.getGameHistory();

			expect(history.size).toBe(2);
			expect(history.get("2024-01-15")).toEqual(["A", "B", "C"]);
			expect(history.get("2024-01-16")).toEqual(["D", "E"]);
		});
	});

	describe("setSession", () => {
		it("should save session to localStorage", () => {
			localStorageMock.clear();
			const historyService = createGameHistoryService();

			historyService.setSession("2024-01-15", ["A", "B", "C"]);

			const savedData = localStorageMock.getItem("deciphraze-game-history");
			const parsedData = JSON.parse(savedData || "[]");

			expect(parsedData).toContainEqual(["2024-01-15", ["A", "B", "C"]]);
		});

		it("should update existing session", () => {
			localStorageMock.clear();
			const historyService = createGameHistoryService();

			historyService.setSession("2024-01-15", ["A", "B"]);

			historyService.setSession("2024-01-15", ["A", "B", "C", "D"]);

			const history = historyService.getGameHistory();
			expect(history.get("2024-01-15")).toEqual(["A", "B", "C", "D"]);
		});

		it("should handle multiple sessions", () => {
			localStorageMock.clear();
			const historyService = createGameHistoryService();

			historyService.setSession("2024-01-15", ["A", "B"]);
			historyService.setSession("2024-01-16", ["C", "D"]);
			historyService.setSession("2024-01-17", ["E", "F"]);

			const history = historyService.getGameHistory();
			expect(history.size).toBe(3);
			expect(history.get("2024-01-15")).toEqual(["A", "B"]);
			expect(history.get("2024-01-16")).toEqual(["C", "D"]);
			expect(history.get("2024-01-17")).toEqual(["E", "F"]);
		});
	});

	describe("Observable updates", () => {
		it("should emit updates when setting sessions", async () => {
			localStorageMock.clear();
			const historyService = createGameHistoryService();
			const updates: Map<string, string[]>[] = [];

			historyService.gameHistory$.subscribe((history) => {
				updates.push(history);
			});

			historyService.setSession("2024-01-15", ["A", "B", "C"]);

			await new Promise((resolve) => setTimeout(resolve, 0));

			expect(updates.length).toBeGreaterThanOrEqual(1);
			expect(updates[updates.length - 1].get("2024-01-15")).toEqual([
				"A",
				"B",
				"C",
			]);
		});
	});

	describe("Persistence across instances", () => {
		it("should persist data across multiple service instances", () => {
			localStorageMock.clear();
			const historyService1 = createGameHistoryService();
			historyService1.setSession("2024-01-15", ["A", "B", "C"]);

			const historyService2 = createGameHistoryService();
			const history = historyService2.getGameHistory();

			expect(history.size).toBe(1);
			expect(history.get("2024-01-15")).toEqual(["A", "B", "C"]);
		});

		it("should handle corrupted localStorage data gracefully", () => {
			localStorageMock.clear();
			localStorageMock.setItem("deciphraze-game-history", "invalid-json");

			const historyService = createGameHistoryService();
			const history = historyService.getGameHistory();

			expect(history.size).toBe(0);
		});
	});

	describe("Edge cases", () => {
		it("should handle empty letters array", () => {
			localStorageMock.clear();
			const historyService = createGameHistoryService();

			historyService.setSession("2024-01-15", []);

			const history = historyService.getGameHistory();
			expect(history.get("2024-01-15")).toEqual([]);
		});

		it("should handle special characters in dates", () => {
			localStorageMock.clear();
			const historyService = createGameHistoryService();

			historyService.setSession("2024-01-15", ["É", "À", "Ç"]);

			const history = historyService.getGameHistory();
			expect(history.get("2024-01-15")).toEqual(["É", "À", "Ç"]);
		});
	});
});
