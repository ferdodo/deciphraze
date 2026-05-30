import { describe, it, expect } from "vitest";
import { inputChallenge } from "./inputChallenge";
import { getChallengeWordForLevelAndDay, encodeChallengeCode, decodeChallengeCode } from "@deciphraze/core";
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

	it("should add a lowercase code and unlock a letter", () => {
		const playerId = "player-alice";
		const mondayDate = "2026-04-27"; // Monday = letterIndex 0
		const randomService = createRandomService();

		let savedCodes: unknown;
		const gameContext = {
			timeService: {
				getRealDay: () => ({
					toString: () => mondayDate,
				}),
			},
			challengeCodesRepository: {
				getCodes: () => ({
					usedCodes: new Set(),
				}),
				saveCodes: (codes: ChallengeCodes) => {
					savedCodes = codes;
				},
				observeCodes: () => () => {},
			},
			challengeRepository: {
				getChallenge: () => ({
					level: 1,
					id: playerId,
				}),
				observeChallenge: () => () => {},
			},
			randomService,
		} as unknown as GameContext;

		// Create a valid code and convert it to lowercase
		const validCode = encodeChallengeCode(playerId, mondayDate, 1, randomService);
		const lowercaseCode = validCode.toLowerCase();

		inputChallenge(lowercaseCode, gameContext);

		expect(savedCodes).not.toBeNull();
		const codes = savedCodes as ChallengeCodes;
		expect(codes.usedCodes.has(lowercaseCode)).toBe(true);

		// Verify the lowercase code can be decoded to unlock a letter
		const decoded = decodeChallengeCode(playerId, lowercaseCode, randomService);
		expect(decoded.result).not.toBe("error");
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
