import { describe, it, expect } from "vitest";
import { createGameSession } from "./createGameSession";
import { withFinishedGame } from "../fixtures/withFinishedGame";

describe("createGameSession", () => {

	it("should remove duplicate letters", () => {
		const [cleanup, context] = withFinishedGame();
		const day = context.dayRepository.getDay();
		const gameSession = createGameSession(day, context.discoveryOrderRepository, "Hello world");
		expect(gameSession.winAt).toBe(day);
		const uniqueLetters = [...new Set(gameSession.lettersFound)];
		expect(gameSession.lettersFound).toEqual(uniqueLetters);
		cleanup();
	});

	it("should calculate wordsFound correctly", () => {
		const [cleanup, context] = withFinishedGame();
		const day = context.dayRepository.getDay();
		const paragraph = "Hello world test";
		const gameSession = createGameSession(day, context.discoveryOrderRepository, paragraph);
		expect(gameSession.wordsFound).toBe(3); // "Hello", "world", "test"
		cleanup();
	});

	it("should handle empty paragraph", () => {
		const [cleanup, context] = withFinishedGame();
		const day = context.dayRepository.getDay();
		const gameSession = createGameSession(day, context.discoveryOrderRepository, "");
		expect(gameSession.wordsFound).toBe(0);
		cleanup();
	});
});
