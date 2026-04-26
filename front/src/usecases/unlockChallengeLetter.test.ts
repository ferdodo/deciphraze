import { describe, it, expect } from "vitest";
import { unlockChallengeLetter } from "./unlockChallengeLetter";
import type { GameContext } from "../contexts/GameContext";
import type { ChallengeCodes } from "../entities/ChallengeCodes";

describe("unlockChallengeLetter", () => {
	it("should add a code to the used codes", () => {
		let savedCodes: unknown;
		const gameContext = {
			challengeCodesRepository: {
				getCodes: () => ({
					usedCodes: new Set(),
				}),
				saveCodes: (codes: ChallengeCodes) => {
					savedCodes = codes;
				},
				observeCodes: () => () => {},
			},
		} as unknown as GameContext;

		unlockChallengeLetter("ABC123", gameContext);

		expect(savedCodes).not.toBeNull();
		expect((savedCodes as ChallengeCodes).usedCodes.has("ABC123")).toBe(true);
	});

});
