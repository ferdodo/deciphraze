import { describe, it, expect } from "vitest";
import { displayChallengeCode } from "./displayChallengeCode";
import type { GameContext } from "../contexts/GameContext";
import type { GameSession } from "../entities";
import type { TimeService } from "../services/TimeService";
import { createRandomServiceMock } from "../utils/createRandomServiceMock";
import { Temporal } from "temporal-polyfill";

describe("displayChallengeCode", () => {
	it("should not save context when game is not completed today", () => {
		const randomService = createRandomServiceMock();
		const realDay = Temporal.PlainDate.from("2024-01-01");
		const timeService: TimeService = {
			getRealDay: () => realDay,
			observeRealDay: () => () => {},
		};
		let savedContextCalled = false;
		const gameHistoryRepository = {
			getHistory: () => ({
				"2024-01-01": ["a", "b"],
			}),
		};
		const challengeRepository = {
			getChallenge: () => ({ id: "test-id", level: 1 }),
		};
		const challengeContextRepository = {
			saveContext: () => {
				savedContextCalled = true;
			},
		};

		const gameContext = {
			randomService,
			timeService,
			gameHistoryRepository,
			challengeRepository,
			challengeContextRepository,
		} as unknown as GameContext;

		displayChallengeCode(gameContext);

		expect(savedContextCalled).toBe(false);
	});

	it("should save context with code when game is completed today", () => {
		const randomService = createRandomServiceMock();
		const realDay = Temporal.PlainDate.from("2024-01-01");
		const timeService: TimeService = {
			getRealDay: () => realDay,
			observeRealDay: () => () => {},
		};
		let savedCode: string | null = null;
		const session: GameSession = {
			lettersFound: [],
			winAt: "2024-01-01",
		};
		const gameHistoryRepository = {
			getHistory: () => ({
				"2024-01-01": session,
			}),
		};
		const challengeRepository = {
			getChallenge: () => ({ id: "test-id", level: 1 }),
		};
		const challengeContextRepository = {
			saveContext: (context: { code: string }) => {
				savedCode = context.code;
			},
		};

		const gameContext = {
			randomService,
			timeService,
			gameHistoryRepository,
			challengeRepository,
			challengeContextRepository,
		} as unknown as GameContext;

		displayChallengeCode(gameContext);

		expect(savedCode).toBeTruthy();
		expect(typeof savedCode).toBe("string");
	});
});
