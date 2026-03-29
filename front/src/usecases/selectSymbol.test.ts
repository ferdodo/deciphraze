import { describe, it, expect } from "vitest";
import { selectSymbol } from "./selectSymbol";
import { selectLetter } from "./selectLetter";
import { withGameStarted } from "../fixtures/withGameStarted";
import { getPlayerCipherFromAllGames } from "../utils/getPlayerCipherFromAllGames";
import { getLetterSelectionFromAllGames } from "../utils/getLetterSelectionFromAllGames";
import { getSymbolSelectionFromAllGames } from "../utils/getSymbolSelectionFromAllGames";

describe("selectSymbol", () => {
	describe("Basic selection", () => {
		it("should select a symbol when no letter is selected", () => {
			const [cleanup, context] = withGameStarted();
			const day = context.dayRepository.getRealTodaysDate();
			selectSymbol("X", context);
			expect(getSymbolSelectionFromAllGames(context.allGamesRepository.get(), day)).toBe("X");
			expect(getLetterSelectionFromAllGames(context.allGamesRepository.get(), day)).toBeNull();
			cleanup();
		});

		it("should not select non-alphabetic characters", () => {
			const [cleanup, context] = withGameStarted();
			const day = context.dayRepository.getRealTodaysDate();
			selectSymbol("1", context);
			selectSymbol("0", context);
			expect(getSymbolSelectionFromAllGames(context.allGamesRepository.get(), day)).toBeNull();
			cleanup();
		});

		it("should replace previous letter association when associating symbol to a different letter", () => {
			const [cleanup, context] = withGameStarted();
			const day = context.dayRepository.getRealTodaysDate();
			
			// Créer association A->X
			selectLetter("A", context);
			selectSymbol("X", context);
			expect(getPlayerCipherFromAllGames(context.allGamesRepository.get(), day).A).toBe("X");
			
			// Créer association B->X (remplace A->X)
			selectLetter("B", context);
			selectSymbol("X", context);
			const cipher = getPlayerCipherFromAllGames(context.allGamesRepository.get(), day);
			expect(cipher.A).toBeUndefined();
			expect(cipher.B).toBe("X");
			cleanup();
		});
	});
});