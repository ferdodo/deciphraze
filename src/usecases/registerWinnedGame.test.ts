import { describe, it, expect } from "vitest";
import { of } from "rxjs";
import { registerWinnedGame } from "./registerWinnedGame";
import type { GameSession } from "../types/GameSession";
import type { AchievementRepository } from "../types/AchievementRepository";
import type { GameHistoryRepository } from "../types/GameHistoryRepository";
import type { GameHistory } from "../types/GameHistory";
import type { AllAchievements } from "../types/AllAchievements";

describe("registerWinnedGame", () => {
	it("should register a winned game and update achievements", () => {

		const gameSession: GameSession = {
			winAt: "2024-01-15",
			lettersFound: ["A", "B"]
		};

		// Mock the repositories to track calls
		let addSessionCalled = false;
		let saveAchievementsCalled = false;
		let savedAchievements: AllAchievements | undefined;

		const achievementRepo: AchievementRepository = {
			loadAchievements: () => ({
				firstGame: {
					achievementId: "first_game",
					name: "Premier pas",
					description: "Jouer votre première partie",
					unlocked: false
				},
				streak5Days: {
					achievementId: "streak_5_days",
					name: "Série de 5 jours",
					description: "Réussir une partie 5 jours consécutifs",
					unlocked: false,
					progress: { current: 0, target: 5 }
				}
			}),
		saveAchievements: (achievements: AllAchievements) => {
			saveAchievementsCalled = true;
			savedAchievements = achievements;
		},
			achievements$: of({} as AllAchievements)
		};

		const gameHistoryRepo: GameHistoryRepository = {
			getHistory: () => ({ "2024-01-15": ["A", "B"] }),
			addSession: () => {
				addSessionCalled = true;
			}
		};

		registerWinnedGame(gameSession, achievementRepo, gameHistoryRepo);

		expect(addSessionCalled).toBe(true);
		expect(saveAchievementsCalled).toBe(true);
		expect(savedAchievements).toBeDefined();
		expect(savedAchievements?.firstGame.unlocked).toBe(true);
	});


	it("should handle multiple achievements", () => {

		// Mock history with 5 consecutive days
		const gameHistory: GameHistory = {
			"2024-01-11": ["A"],
			"2024-01-12": ["B"],
			"2024-01-13": ["C"],
			"2024-01-14": ["D"],
			"2024-01-15": ["E"]
		};

		const gameHistoryRepo: GameHistoryRepository = {
			getHistory: () => gameHistory,
			addSession: () => {}
		};

		let savedAchievements: AllAchievements | undefined;
		const achievementRepoWithTracking: AchievementRepository = {
			loadAchievements: () => ({
				firstGame: {
					achievementId: "first_game",
					name: "Premier pas",
					description: "Jouer votre première partie",
					unlocked: false
				},
				streak5Days: {
					achievementId: "streak_5_days",
					name: "Série de 5 jours",
					description: "Réussir une partie 5 jours consécutifs",
					unlocked: false,
					progress: { current: 0, target: 5 }
				}
			}),
		saveAchievements: (achievements: AllAchievements) => {
			savedAchievements = achievements;
		},
			achievements$: of({} as AllAchievements)
		};

		const gameSession: GameSession = {
			winAt: "2024-01-15",
			lettersFound: ["E"]
		};

		registerWinnedGame(gameSession, achievementRepoWithTracking, gameHistoryRepo);

		expect(savedAchievements).toBeDefined();
		expect(savedAchievements?.firstGame.unlocked).toBe(true);
		expect(savedAchievements?.streak5Days.unlocked).toBe(true);
	});
});