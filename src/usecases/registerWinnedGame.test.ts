import { describe, it, expect } from "vitest";
import { registerWinnedGame } from "./registerWinnedGame";
import { withGameStarted } from "../fixtures/withGameStarted";

describe("registerWinnedGame", () => {
	it("should not register if player has not won", async () => {
		const context = withGameStarted();
		const subscription = registerWinnedGame(context);
		const gameHistory = context.gameHistoryRepository.getHistory();
		expect(gameHistory).toEqual({});
		subscription.unsubscribe();
	});
});