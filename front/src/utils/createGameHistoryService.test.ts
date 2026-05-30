import { describe, it, expect } from "vitest";
import { createGameHistoryService } from "./createGameHistoryService";

describe("createGameHistoryService", () => {
	it("should start with empty history", () => {
		const service = createGameHistoryService();
		const history = service.getGameHistory();
		expect(history).toEqual([]);
	});

	it("should add a new session", () => {
		const service = createGameHistoryService();
		service.setSession("2024-01-15", ["A", "B"]);
		const history = service.getGameHistory();
		expect(history).toHaveLength(1);
		expect(history[0]).toEqual({
			winAt: "2024-01-15",
			lettersFound: ["A", "B"]
		});
	});

	it("should update existing session", () => {
		const service = createGameHistoryService();
		service.setSession("2024-01-15", ["A", "B"]);
		service.setSession("2024-01-15", ["C", "D"]);
		const history = service.getGameHistory();
		expect(history).toHaveLength(1);
		expect(history[0]).toEqual({
			winAt: "2024-01-15",
			lettersFound: ["C", "D"]
		});
	});

	it("should emit updates when adding sessions", async () => {
		const service = createGameHistoryService();
		const updates: unknown[] = [];
		
		service.gameHistory$.subscribe((history) => {
			updates.push(history);
		});

		service.setSession("2024-01-15", ["A", "B"]);
		
		// Wait for the subscription to be called
		await new Promise(resolve => setTimeout(resolve, 10));
		
		expect(updates.length).toBeGreaterThan(0);
		expect(updates[0]).toEqual([{
			winAt: "2024-01-15",
			lettersFound: ["A", "B"]
		}]);
	});
});
