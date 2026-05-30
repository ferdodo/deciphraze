import { describe, it, expect } from "vitest";
import { inputChallenge } from "./inputChallenge";
import { getChallengeWordForLevelAndDay } from "@deciphraze/core";
import type { GameContext, Challenge, ChallengeCodes } from "@deciphraze/core";
import { createRandomService } from "../utils/createRandomService";

describe("inputChallenge", () => {
	it("should add a code when input is not 7 characters", () => {
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

		inputChallenge("ABC123", gameContext);

		expect(savedCodes).not.toBeNull();
		expect((savedCodes as ChallengeCodes).usedCodes.has("ABC123")).toBe(true);
	});

	it("should attempt word submission when input is 7 characters", () => {
		const realDay = "2026-04-25";
		let saveChallengeWasCalled = false;
		const challenge: Challenge = {
			level: 1,
			id: "player-alice",
		};
		const randomService = createRandomService();

		const gameContext = {
			timeService: {
				getRealDay: () => ({
					toString: () => realDay,
				}),
			},
			randomService,
			challengeRepository: {
				getChallenge: () => challenge,
				saveChallenge: (newChallenge: Challenge) => {
					saveChallengeWasCalled = true;
					Object.assign(challenge, newChallenge);
				},
				observeChallenge: () => () => {},
			},
			browserService: {
				confirm: () => false,
			},
		} as unknown as GameContext;

		const correctWord = getChallengeWordForLevelAndDay(1, realDay, randomService);
		inputChallenge(correctWord, gameContext);

		expect(saveChallengeWasCalled).toBe(true);
	});

	it("should not advance level if 7-character input is incorrect", () => {
		const realDay = "2026-04-25";
		let saveChallengeWasCalled = false;
		const challenge: Challenge = {
			level: 1,
			id: "player-alice",
		};
		const randomService = createRandomService();

		const gameContext = {
			timeService: {
				getRealDay: () => ({
					toString: () => realDay,
				}),
			},
			randomService,
			challengeRepository: {
				getChallenge: () => challenge,
				saveChallenge: (newChallenge: Challenge) => {
					saveChallengeWasCalled = true;
					Object.assign(challenge, newChallenge);
				},
				observeChallenge: () => () => {},
			},
			browserService: {
				confirm: () => false,
			},
		} as unknown as GameContext;

		inputChallenge("wrongwd", gameContext);

		expect(saveChallengeWasCalled).toBe(false);
	});
});
