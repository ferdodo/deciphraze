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
			removeByDay: () => { throw new Error("Should not remove"); },
			upsertByDay: () => { throw new Error("Should not upsert"); },
		};

		const mockBrowserService = {
			confirm: () => false,
		};

		const context = {
			allGamesRepository: mockAllGamesRepository,
			browserService: mockBrowserService,
		} as unknown as GameContext;

		abandonGame(context);
		// If we get here without errors, the test passes
	});

	it("should remove current game and keep others when confirmed", () => {
		let removedDay: string | null = null;

		const mockAllGamesRepository = {
			get: () => ({
				gameByDay: {
					"2025-02-28": { letterSelection: {}, symbolSelection: {}, playerCipher: {} },
					"2025-03-01": { letterSelection: {}, symbolSelection: {}, playerCipher: {} },
				},
			}),
			removeByDay: (day: string) => {
				removedDay = day;
			},
			upsertByDay: () => {},
		};

		const mockBrowserService = {
			confirm: () => true,
		};

		const context = {
			allGamesRepository: mockAllGamesRepository,
			browserService: mockBrowserService,
		} as unknown as GameContext;

		abandonGame(context);

		expect(removedDay).toBe("2025-02-28");
	});
});
