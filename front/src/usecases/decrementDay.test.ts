import { describe, it, expect } from "vitest";
import { decrementDay } from "./decrementDay";
import { withGameStarted } from "../fixtures/withGameStarted";
import { getCurrentDay } from "../utils/getCurrentDay";

describe("decrementDay", () => {
	it("should decrement day by 1", () => {
		const [cleanup, context] = withGameStarted();
		const initialDay = getCurrentDay(context.timeService, context.forcedDayRepository);
		decrementDay(context);
		const newDay = getCurrentDay(context.timeService, context.forcedDayRepository);
		
		const initialDate = new Date(initialDay);
		const expectedDate = new Date(initialDate);
		expectedDate.setDate(expectedDate.getDate() - 1);
		
		const expectedDay = `${expectedDate.getFullYear()}-${String(expectedDate.getMonth() + 1).padStart(2, '0')}-${String(expectedDate.getDate()).padStart(2, '0')}`;
		
		expect(newDay).toBe(expectedDay);
		cleanup();
	});

	it("should clear letterSelection and symbolSelection when decrementing day", () => {
		const [cleanup, context] = withGameStarted();
		
		// Get the initial game state
		let allGames = context.allGamesRepository.get();
		let gameDay = Object.keys(allGames.gameByDay)[0];
		
		// Set some non-null selections
		context.allGamesRepository.upsertByDay(gameDay, {
			letterSelection: "A",
			symbolSelection: "X",
			playerCipher: {},
		});
		
		// Verify selections were set
		allGames = context.allGamesRepository.get();
		gameDay = Object.keys(allGames.gameByDay)[0];
		expect(allGames.gameByDay[gameDay]?.letterSelection).toBe("A");
		expect(allGames.gameByDay[gameDay]?.symbolSelection).toBe("X");
		
		// Decrement day
		decrementDay(context);
		
		// Verify letterSelection and symbolSelection were cleared for the game day
		allGames = context.allGamesRepository.get();
		gameDay = Object.keys(allGames.gameByDay)[0];
		expect(allGames.gameByDay[gameDay]?.letterSelection).toBeNull();
		expect(allGames.gameByDay[gameDay]?.symbolSelection).toBeNull();
		
		cleanup();
	});
});
