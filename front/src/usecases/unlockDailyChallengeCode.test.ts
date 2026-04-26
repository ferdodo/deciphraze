import { describe, it, expect } from "vitest";
import { unlockDailyChallengeCode } from "./unlockDailyChallengeCode";
import type { GameContext } from "../contexts/GameContext";
import type { Challenge } from "../entities/Challenge";

describe("unlockDailyChallengeCode", () => {
	const mockRealDay = "2026-04-25";

	function createGameContext(
		challenge: Challenge,
		gameCompleted: boolean
	): GameContext {
		return {
			timeService: {
				getRealDay: () => ({
					toString: () => mockRealDay,
				}),
				observeRealDay: () => () => {},
			},
			gameHistoryRepository: {
				getHistory: () =>
					gameCompleted
						? {
								[mockRealDay]: {
									winAt: mockRealDay,
									lettersFound: ["a", "b"],
								},
							}
						: {},
				addSession: () => {},
			},
			challengeRepository: {
				getChallenge: () => challenge,
				saveChallenge: () => {},
				observeChallenge: () => () => {},
			},
			achievementRepository: { loadAchievements: () => ({}) },
			forcedDayRepository: { getForcedDay: () => null },
			discoveryOrderRepository: { getDiscoveryOrder: () => [] },
			statisticsRepository: { getStatistics: () => ({}) },
			associationHistoryRepository: { getAssociationHistory: () => {} },
			settingsRepository: { getSettings: () => ({}) },
			viewedAchievementsRepository: { getViewedAchievements: () => ({}) },
			allGamesRepository: { get: () => ({}) },
			browserService: { hasClipboard: () => false },
		} as unknown as GameContext;
	}

	it("should return a code when conditions are met", () => {
		const challenge: Challenge = {
			level: 1,
			id: "player-alice",
		};
		const gameContext = createGameContext(challenge, true);

		const code = unlockDailyChallengeCode(2, gameContext);

		expect(code).toBeTruthy();
		expect(code).toHaveLength(16);
		expect(/^[A-Z0-9]{16}$/.test(code ?? "")).toBe(true);
	});

	it("should return null if today's game is not completed", () => {
		const challenge: Challenge = {
			level: 1,
			id: "player-alice",
		};
		const gameContext = createGameContext(challenge, false);

		const code = unlockDailyChallengeCode(1, gameContext);

		expect(code).toBeNull();
	});

	it("should return null if level > current level + 1", () => {
		const challenge: Challenge = {
			level: 1,
			id: "player-alice",
		};
		const gameContext = createGameContext(challenge, true);

		const code = unlockDailyChallengeCode(5, gameContext);

		expect(code).toBeNull();
	});

	it("should return null if level < 1", () => {
		const challenge: Challenge = {
			level: 1,
			id: "player-alice",
		};
		const gameContext = createGameContext(challenge, true);

		const code = unlockDailyChallengeCode(0, gameContext);

		expect(code).toBeNull();
	});

});

