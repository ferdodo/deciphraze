import { describe, it, expect } from "vitest";
import { incrementDay } from "./incrementDay";
import { selectLetter } from "./selectLetter";
import { selectSymbol } from "./selectSymbol";
import { withGameStarted } from "../fixtures/withGameStarted";
import { getPlayerCipherFromAllGames } from "../utils/getPlayerCipherFromAllGames";

describe("incrementDay", () => {
	it("should increment day by 1", () => {
		const [cleanup, context] = withGameStarted();
		const initialDay = context.dayRepository.getDay();
		incrementDay(context);
		const newDay = context.dayRepository.getDay();
		
		const initialDate = new Date(initialDay);
		const expectedDate = new Date(initialDate);
		expectedDate.setDate(expectedDate.getDate() + 1);
		
		const expectedDay = `${expectedDate.getFullYear()}-${String(expectedDate.getMonth() + 1).padStart(2, '0')}-${String(expectedDate.getDate()).padStart(2, '0')}`;
		
		expect(newDay).toBe(expectedDay);
		cleanup();
	});

	it("should preserve player cipher when incrementing day", () => {
		const [cleanup, context] = withGameStarted();
		const initialDay = context.dayRepository.getDay();
		
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
});

