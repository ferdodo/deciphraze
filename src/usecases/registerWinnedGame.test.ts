import { describe, it, expect } from "vitest";
import { registerWinnedGame } from "./registerWinnedGame";
import { withGameStarted } from "../fixtures/withGameStarted";
import { withGameWonInCipherOrder } from "../fixtures/withGameWonInCipherOrder";

describe("registerWinnedGame", () => {
	it("should not register if player has not won", async () => {
		const context = withGameStarted();
		const subscription = registerWinnedGame(context);
		const gameHistory = context.gameHistoryRepository.getHistory();
		expect(gameHistory).toEqual({});
		subscription.unsubscribe();
	});

	it("should preserve the order of letters found by the player", async () => {
		const context = withGameWonInCipherOrder();
		const subscription = registerWinnedGame(context);
		
		const gameHistory = context.gameHistoryRepository.getHistory();
		const today = context.dayRepository.getDay();
		expect(gameHistory[today]).toBeDefined();
		
		const paragraphOfTheDay = context.paragraphOfTheDayRepository.getParagraphOfTheDay();
		const expectedLetters = [...paragraphOfTheDay]
			.filter(letter => letter.match(/[a-zA-Z]/))
			.filter((letter, index, array) => array.indexOf(letter) === index);
		
		expect(gameHistory[today]).toEqual(expectedLetters);
		subscription.unsubscribe();
	});
});