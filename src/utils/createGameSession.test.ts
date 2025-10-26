import { describe, it, expect } from "vitest";
import { createGameSession } from "./createGameSession";
import { withFinishedGame } from "../fixtures/withFinishedGame";

describe("createGameSession", () => {

	it("should remove duplicate letters", () => {
		const [cleanup, context] = withFinishedGame();
		const day = context.dayRepository.getDay();
		const gameSession = createGameSession(day, context.discoveryOrderRepository);
		expect(gameSession.winAt).toBe(day);
		const uniqueLetters = [...new Set(gameSession.lettersFound)];
		expect(gameSession.lettersFound).toEqual(uniqueLetters);
		cleanup();
	});
});
