import { describe, it, expect } from "vitest";
import { getCurrentGameDay } from "./getCurrentGameDay";
import type { AllGames } from "../entities/AllGames";

describe("getCurrentGameDay", () => {
	it("should return currentDay when allGames is empty", () => {
		const allGames: AllGames = { gameByDay: {} };
		const result = getCurrentGameDay(allGames, "2025-03-01");
		expect(result).toBe("2025-03-01");
	});

	it("should return the earliest day when multiple games exist", () => {
		const allGames: AllGames = {
			gameByDay: {
				"2025-03-01": { letterSelection: null, symbolSelection: null, playerCipher: {} },
				"2025-03-03": { letterSelection: null, symbolSelection: null, playerCipher: {} },
				"2025-03-02": { letterSelection: null, symbolSelection: null, playerCipher: {} },
			},
		};
		const result = getCurrentGameDay(allGames, "2025-03-04");
		expect(result).toBe("2025-03-01");
	});

	it("should return the earliest day even when games are added in non-sorted order", () => {
		const allGames: AllGames = {
			gameByDay: {
				"2025-03-05": { letterSelection: null, symbolSelection: null, playerCipher: {} },
				"2025-03-02": { letterSelection: null, symbolSelection: null, playerCipher: {} },
				"2025-03-04": { letterSelection: null, symbolSelection: null, playerCipher: {} },
				"2025-03-01": { letterSelection: null, symbolSelection: null, playerCipher: {} },
				"2025-03-03": { letterSelection: null, symbolSelection: null, playerCipher: {} },
			},
		};
		const result = getCurrentGameDay(allGames, "2025-03-10");
		expect(result).toBe("2025-03-01");
	});
});
