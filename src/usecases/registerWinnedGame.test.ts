import { describe, it, expect } from "vitest";
import { withFinishedGame } from "../fixtures/withFinishedGame";

describe("registerWinnedGame", () => {
	it("should register a won game", async () => {
		const [cleanup, context] = withFinishedGame();
		const gameHistory = context.gameHistoryRepository.getHistory();
		expect(gameHistory).not.toEqual({});
		cleanup();
	});
});