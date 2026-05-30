import { describe, it, expect } from "vitest";
import { incrementDay } from "./incrementDay";
import { selectLetter } from "./selectLetter";
import { selectSymbol } from "./selectSymbol";
import { withGameStarted } from "../fixtures/withGameStarted";
import { getCurrentDay } from "../utils/getCurrentDay";
import { getPlayerCipherFromAllGames } from "../utils/getPlayerCipherFromAllGames";

describe("incrementDay", () => {
	it("should increment day by 1", () => {
		const [cleanup, context] = withGameStarted();
		const initialDay = getCurrentDay(context.timeService, context.forcedDayRepository);
		incrementDay(context);
		const newDay = getCurrentDay(context.timeService, context.forcedDayRepository);
		
		const initialDate = new Date(initialDay);
		const expectedDate = new Date(initialDate);
		expectedDate.setDate(expectedDate.getDate() + 1);
		
		const expectedDay = `${expectedDate.getFullYear()}-${String(expectedDate.getMonth() + 1).padStart(2, '0')}-${String(expectedDate.getDate()).padStart(2, '0')}`;
		
		expect(newDay).toBe(expectedDay);
		cleanup();
	});

	it("should preserve player cipher when incrementing day", () => {
		const [cleanup, context] = withGameStarted();
		const initialDay = getCurrentDay(context.timeService, context.forcedDayRepository);
		
		// Make an association
		selectLetter("A", context);
		selectSymbol("X", context);
		
		const cipherBefore = getPlayerCipherFromAllGames(context.allGamesRepository.get(), initialDay);
		expect(cipherBefore.A).toBe("X");
		
		// Increment day
		incrementDay(context);
		
		// Verify cipher is still there
		const cipherAfter = getPlayerCipherFromAllGames(context.allGamesRepository.get(), initialDay);
		expect(cipherAfter.A).toBe("X");
		
		cleanup();
	});

	it("should clear selections and reset discovery order for the new virtual day", () => {
		const [cleanup, context] = withGameStarted();
		const initialDay = getCurrentDay(context.timeService, context.forcedDayRepository);
		const initialAllGames = context.allGamesRepository.get();
		const gameDay = Object.keys(initialAllGames.gameByDay)[0] ?? initialDay;
		const expectedNewDayDate = new Date(initialDay);
		expectedNewDayDate.setDate(expectedNewDayDate.getDate() + 1);
		const expectedNewDay = `${expectedNewDayDate.getFullYear()}-${String(expectedNewDayDate.getMonth() + 1).padStart(2, "0")}-${String(expectedNewDayDate.getDate()).padStart(2, "0")}`;

		context.allGamesRepository.upsertByDay(gameDay, {
			letterSelection: "A",
			symbolSelection: "X",
			playerCipher: { B: "Y" },
		});
		context.discoveryOrderRepository.setDiscoveryOrder(expectedNewDay, ["A", "B"]);

		incrementDay(context);

		const allGames = context.allGamesRepository.get();
		expect(allGames.gameByDay[gameDay]?.letterSelection).toBeNull();
		expect(allGames.gameByDay[gameDay]?.symbolSelection).toBeNull();
		expect(allGames.gameByDay[gameDay]?.playerCipher.B).toBe("Y");
		expect(context.discoveryOrderRepository.getDiscoveryOrder(expectedNewDay)).toEqual([]);
		expect(getCurrentDay(context.timeService, context.forcedDayRepository)).toBe(expectedNewDay);

		cleanup();
	});
});
