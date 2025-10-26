import { describe, it, expect } from "vitest";
import { withGameStarted } from "../fixtures/withGameStarted";
import { withFinishedGame } from "../fixtures/withFinishedGame";

describe("registerWinnedGame", () => {
	it("should not register if player has not won", async () => {
		const [cleanup, context] = withGameStarted();
		const gameHistory = context.gameHistoryRepository.getHistory();
		expect(gameHistory).toEqual({});
		cleanup();
	});

	it("should register a won game", async () => {
		const [cleanup, context] = withFinishedGame();
		const gameHistory = context.gameHistoryRepository.getHistory();
		expect(gameHistory).not.toEqual({});
		cleanup();
	});
});