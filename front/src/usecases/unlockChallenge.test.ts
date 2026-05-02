import { describe, it, expect } from "vitest";
import { unlockChallenge } from "./unlockChallenge";
import { getChallengeWordForLevelAndDay } from "@deciphraze/core";
import type { GameContext, Challenge } from "@deciphraze/core";
import { createRandomService } from "../utils/createRandomService";

describe("unlockChallenge", () => {
	it("should do nothing if the guessed word is incorrect", () => {
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
		} as unknown as GameContext;

		unlockChallenge("wrong", gameContext);

		expect(saveChallengeWasCalled).toBe(false);
	});

	it("should advance the level if the guessed word is correct", () => {
		const realDay = "2026-04-25";
		let savedChallenge: Challenge | null = null;
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
					savedChallenge = newChallenge;
					Object.assign(challenge, newChallenge);
				},
				observeChallenge: () => () => {},
			},
		} as unknown as GameContext;

		const correctWord = getChallengeWordForLevelAndDay(2, realDay, randomService);
		unlockChallenge(correctWord, gameContext);

		expect(savedChallenge).toEqual({
			level: 2,
			id: "player-alice",
		});
	});

});

