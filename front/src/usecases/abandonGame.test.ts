import { describe, it, expect } from "vitest";
import { abandonGame } from "./abandonGame";
import type { GameContext } from "../contexts/GameContext";

describe("abandonGame", () => {
	it("should do nothing if user cancels confirmation", () => {
		const mockAllGamesRepository = {
			get: () => ({
				gameByDay: {
					"2025-02-28": { letterSelection: {}, symbolSelection: {}, playerCipher: {} },
					"2025-03-01": { letterSelection: {}, symbolSelection: {}, playerCipher: {} },
				},
			}),
			clear: () => { throw new Error("Should not clear"); },
			upsertByDay: () => { throw new Error("Should not upsert"); },
		};

		const mockDayRepository = {
			getRealTodaysDate: () => "2025-03-01",
			setRealTodaysDate: () => { throw new Error("Should not set day"); },
		};

		const mockBrowserService = {
			confirm: () => false,
		};

		const context = {
			allGamesRepository: mockAllGamesRepository,
			dayRepository: mockDayRepository,
			browserService: mockBrowserService,
		} as unknown as GameContext;

		abandonGame(context);
		// If we get here without errors, the test passes
	});

	it("should remove current game and keep others when confirmed", () => {
		let clearCalled = false;
		let upsertCalled = false;
		const upsertedDays: string[] = [];

		const mockAllGamesRepository = {
			get: () => ({
				gameByDay: {
					"2025-02-28": { letterSelection: {}, symbolSelection: {}, playerCipher: {} },
					"2025-03-01": { letterSelection: {}, symbolSelection: {}, playerCipher: {} },
				},
			}),
			clear: () => { clearCalled = true; },
			upsertByDay: (day: string) => { 
				upsertCalled = true;
				upsertedDays.push(day);
			},
		};

		let setRealTodaysDateCalled = false;
		const mockDayRepository = {
			getRealTodaysDate: () => "2025-03-01",
			setRealTodaysDate: () => { setRealTodaysDateCalled = true; },
		};

		const mockBrowserService = {
			confirm: () => true,
		};

		const context = {
			allGamesRepository: mockAllGamesRepository,
			dayRepository: mockDayRepository,
			browserService: mockBrowserService,
		} as unknown as GameContext;

		abandonGame(context);

		expect(clearCalled).toBe(true);
		expect(upsertCalled).toBe(true);
		expect(setRealTodaysDateCalled).toBe(true);
		expect(upsertedDays).toContain("2025-03-01");
	});
});
