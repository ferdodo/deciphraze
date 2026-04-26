import { describe, it, expect } from "vitest";
import { unlockChallenge } from "./unlockChallenge";
import { getChallengeWordForLevelAndDay } from "../utils/getChallengeWordForLevelAndDay";
import type { GameContext } from "../contexts/GameContext";
import type { Challenge } from "../entities/Challenge";

describe("unlockChallenge", () => {
	it("should do nothing if the guessed word is incorrect", () => {
		const realDay = "2026-04-25";
		let saveChallengeWasCalled = false;
		const challenge: Challenge = {
			level: 1,
			id: "player-alice",
		};

		const gameContext = {
			timeService: {
				getRealDay: () => ({
					toString: () => realDay,
				}),
			},
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

		const gameContext = {
			timeService: {
				getRealDay: () => ({
					toString: () => realDay,
				}),
			},
			challengeRepository: {
				getChallenge: () => challenge,
				saveChallenge: (newChallenge: Challenge) => {
					savedChallenge = newChallenge;
					Object.assign(challenge, newChallenge);
				},
				observeChallenge: () => () => {},
			},
		} as unknown as GameContext;

		const correctWord = getChallengeWordForLevelAndDay(2, realDay);
		unlockChallenge(correctWord, gameContext);

		expect(savedChallenge).toEqual({
			level: 2,
			id: "player-alice",
		});
	});

	it("should handle accented characters correctly", () => {
		const realDay = "2026-04-25";
		let savedChallenge: Challenge | null = null;
		const challenge: Challenge = {
			level: 1,
			id: "player-alice",
		};

		const gameContext = {
			timeService: {
				getRealDay: () => ({
					toString: () => realDay,
				}),
			},
			challengeRepository: {
				getChallenge: () => challenge,
				saveChallenge: (newChallenge: Challenge) => {
					savedChallenge = newChallenge;
					Object.assign(challenge, newChallenge);
				},
				observeChallenge: () => () => {},
			},
		} as unknown as GameContext;

		// Use a word that contains accents naturally, or add accents to test normalization
		const correctWord = getChallengeWordForLevelAndDay(2, realDay);
		const wordWithAccent = correctWord.substring(0, 1) + "é" + correctWord.substring(2);
		unlockChallenge(wordWithAccent, gameContext);

		// Should still save because normalizeWord removes accents
		expect(savedChallenge).toEqual({
			level: 2,
			id: "player-alice",
		});
	});

});

