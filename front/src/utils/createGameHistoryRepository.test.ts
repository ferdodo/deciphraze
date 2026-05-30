import { describe, it, expect } from "vitest";
import { firstValueFrom } from "rxjs";
import { skip } from "rxjs/operators";
import { createGameHistoryRepository } from "./createGameHistoryRepository";
import type { GameSession } from "@deciphraze/core";
import { createLocalStorageMock } from "./createLocalStorageMock";

describe("createGameHistoryRepository", () => {

	it("should create repository instance", () => {
		const storage = createLocalStorageMock();
		const repository = createGameHistoryRepository(storage);
		
		expect(repository).toBeDefined();
		expect(typeof repository.getHistory).toBe("function");
		expect(typeof repository.addSession).toBe("function");
		expect(repository.gameHistory$).toBeDefined();
	});

	it("should return empty history by default", () => {
		const storage = createLocalStorageMock();
		const repository = createGameHistoryRepository(storage);
		const history = repository.getHistory();
		
		expect(history).toEqual({});
		expect(Object.keys(history)).toHaveLength(0);
	});

	it("should add a session and retrieve it", () => {
		const storage = createLocalStorageMock();
		const repository = createGameHistoryRepository(storage);
		const session: GameSession = {
			winAt: "2024-01-15",
			lettersFound: ["A", "B", "C"],
			wordsFound: 10
		};
		
		repository.addSession(session);
		const history = repository.getHistory();
		
		expect(history["2024-01-15"]).toEqual(session);
		expect(Object.keys(history)).toHaveLength(1);
	});

	it("should load existing history from localStorage", () => {
		const storage = createLocalStorageMock();
		const existingHistory = {
			"2024-01-15": {
				winAt: "2024-01-15",
				lettersFound: ["A", "B", "C"]
			}
		};
		storage.setItem("deciphraze_game_history", JSON.stringify(existingHistory));
		
		const repository = createGameHistoryRepository(storage);
		const history = repository.getHistory();
		
		expect(history["2024-01-15"]).toEqual(existingHistory["2024-01-15"]);
	});

	it("should emit history changes through gameHistory$", async () => {
		const storage = createLocalStorageMock();
		const repository = createGameHistoryRepository(storage);
		const session: GameSession = {
			winAt: "2024-01-15",
			lettersFound: ["A", "B"]
		};
		
		const historyPromise = firstValueFrom(repository.gameHistory$.pipe(skip(1)));
		repository.addSession(session);
		
		const history = await historyPromise;
		expect(history["2024-01-15"]).toEqual(session);
	});
});

