import { describe, it, expect } from "vitest";
import { createGameSession } from "./createGameSession";
import { withFinishedGame } from "../fixtures/withFinishedGame";
import { getCurrentDay } from "./getCurrentDay";

describe("createGameSession", () => {

	it("should remove duplicate letters", () => {
		const [cleanup, context] = withFinishedGame();
		const day = getCurrentDay(context.timeService, context.forcedDayRepository);
		const gameSession = createGameSession(day, context.discoveryOrderRepository, context.associationHistoryRepository, "Hello world");
		expect(gameSession.winAt).toBe(day);
		const uniqueLetters = [...new Set(gameSession.lettersFound)];
		expect(gameSession.lettersFound).toEqual(uniqueLetters);
		cleanup();
	});

});
