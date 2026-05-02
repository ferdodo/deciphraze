import { describe, it, expect } from "vitest";
import type { GameContext } from "@deciphraze/core";
import { withGameStarted } from "../fixtures/withGameStarted";
import { asPlayerAssociateOneBadLetter } from "./asPlayerAssociateOneBadLetter";
import { getCurrentDay } from "../utils/getCurrentDay";
import { getPlayerCipherFromAllGames } from "../utils/getPlayerCipherFromAllGames";

describe("asPlayerAssociateOneBadLetter", () => {
	it("should associate one bad letter (different from first available)", () => {
		const [cleanup, context] = withGameStarted() as [() => void, GameContext];
		asPlayerAssociateOneBadLetter(context);
		const today = getCurrentDay(context.timeService, context.forcedDayRepository);
		const allGames = context.allGamesRepository.get();
		const playerCipher = getPlayerCipherFromAllGames(allGames, today);

		// After association, cipher should have at least one entry
		expect(Object.keys(playerCipher).length).toBeGreaterThan(0);

		// The associated letter and symbol should be different
		const associatedPairs = Object.entries(playerCipher);
		for (const [letter, symbol] of associatedPairs) {
			expect(letter).not.toBe(symbol);
		}
		cleanup();
	});

	it("should throw error when no available letters", () => {
		const [cleanup, context] = withGameStarted() as [() => void, GameContext];
		const today = getCurrentDay(context.timeService, context.forcedDayRepository);
		
		// Fill cipher with all 26 letters
		const fullCipher: Record<string, string> = {};
		const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
		for (let i = 0; i < alphabet.length; i++) {
			fullCipher[alphabet[i]] = alphabet[(i + 1) % alphabet.length];
		}

		// Set up game with full cipher
		context.allGamesRepository.upsertByDay(today, {
			letterSelection: null,
			symbolSelection: null,
			playerCipher: fullCipher,
		});

		expect(() => asPlayerAssociateOneBadLetter(context)).toThrow("Aucune lettre disponible pour association");
		cleanup();
	});

	it("should throw error when no available symbols", () => {
		const [cleanup, context] = withGameStarted() as [() => void, GameContext];
		const today = getCurrentDay(context.timeService, context.forcedDayRepository);
		
		// Leave 1 letter available but use all symbols
		// Map 25 letters to 25 first symbols, then map Z to all remaining symbols to exhaust them
		const fullCipher: Record<string, string> = {};
		const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
		
		// Map first 25 letters
		for (let i = 0; i < 25; i++) {
			fullCipher[alphabet[i]] = alphabet[i];
		}
		// Z (the 26th letter) is left without any available different symbol since all are used

		context.allGamesRepository.upsertByDay(today, {
			letterSelection: null,
			symbolSelection: null,
			playerCipher: fullCipher,
		});

		expect(() => asPlayerAssociateOneBadLetter(context)).toThrow("Aucun symbole disponible pour association");
		cleanup();
	});
});

