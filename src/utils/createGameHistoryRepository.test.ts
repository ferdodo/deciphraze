import { describe, it, expect } from "vitest";
import { createGameHistoryRepository } from "./createGameHistoryRepository";

describe("createGameHistoryRepository", () => {
	it("should create repository instance", () => {
		const repository = createGameHistoryRepository();
		
		expect(repository).toBeDefined();
		expect(typeof repository.getHistory).toBe("function");
		expect(typeof repository.addSession).toBe("function");
	});

	it("should return empty history by default", () => {
		const repository = createGameHistoryRepository();
		const history = repository.getHistory();
		
		expect(history).toEqual({});
		expect(Object.keys(history)).toHaveLength(0);
	});


	it("should handle null localStorage", () => {
		localStorage.setItem("deciphraze_game_history", "null");
		const repository = createGameHistoryRepository();
		const history = repository.getHistory();
		
		expect(history).toEqual({});
		expect(Object.keys(history)).toHaveLength(0);
	});


});

