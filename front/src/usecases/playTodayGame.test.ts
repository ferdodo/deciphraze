import { describe, it, expect } from "vitest";
import { playTodayGame } from "./playTodayGame";
import { withGameStarted } from "../fixtures/withGameStarted";

describe("playTodayGame", () => {
	it("should keep games from today onwards and remove past games", () => {
		const [cleanup, context] = withGameStarted();
		const today = context.dayRepository.getRealTodaysDate();

		// Add a game for a past date
		const pastDate = new Date(today);
		pastDate.setDate(pastDate.getDate() - 10);
		const pastDay = `${pastDate.getFullYear()}-${String(pastDate.getMonth() + 1).padStart(2, '0')}-${String(pastDate.getDate()).padStart(2, '0')}`;

		context.allGamesRepository.upsertByDay(pastDay, {
			letterSelection: null,
			symbolSelection: null,
			playerCipher: {},
		});

		// Add a game for today
		context.allGamesRepository.upsertByDay(today, {
			letterSelection: null,
			symbolSelection: null,
			playerCipher: {},
		});

		// Add a game for a future date
		const futureDate = new Date(today);
		futureDate.setDate(futureDate.getDate() + 5);
		const futureDay = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`;

		context.allGamesRepository.upsertByDay(futureDay, {
			letterSelection: null,
			symbolSelection: null,
			playerCipher: {},
		});

		// Verify we have all three games
		let allGames = context.allGamesRepository.get();
		expect(Object.keys(allGames.gameByDay)).toContain(pastDay);
		expect(Object.keys(allGames.gameByDay)).toContain(today);
		expect(Object.keys(allGames.gameByDay)).toContain(futureDay);

		// Play today's game
		playTodayGame(context);

		// Verify past game is removed but today and future games are kept
		allGames = context.allGamesRepository.get();
		expect(Object.keys(allGames.gameByDay)).not.toContain(pastDay);
		expect(Object.keys(allGames.gameByDay)).toContain(today);
		expect(Object.keys(allGames.gameByDay)).toContain(futureDay);

		cleanup();
	});
});
