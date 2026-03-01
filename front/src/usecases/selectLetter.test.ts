import { describe, it, expect } from "vitest";
import { selectLetter } from "./selectLetter";
import { selectSymbol } from "./selectSymbol";
import { withGameStarted } from "../fixtures/withGameStarted";
import { getPlayerCipherFromAllGames } from "../utils/getPlayerCipherFromAllGames";
import { getLetterSelectionFromAllGames } from "../utils/getLetterSelectionFromAllGames";

describe("selectLetter", () => {

	describe("Basic selection", () => {
		it("should deselect letter if already selected", () => {
			const [cleanup, context] = withGameStarted();
			const day = context.dayRepository.getDay();
			
			// Sélectionner une lettre
			selectLetter("A", context);
			expect(getLetterSelectionFromAllGames(context.allGamesRepository.get(), day)).toBe("A");
			
			// Sélectionner la même lettre à nouveau pour la désélectionner
			selectLetter("A", context);
			
			// Vérifier que la lettre est désélectionnée
			expect(getLetterSelectionFromAllGames(context.allGamesRepository.get(), day)).toBeNull();
			
			cleanup();
		});

		it("should not select non-alphabetic characters", () => {
			const [cleanup, context] = withGameStarted();
			const day = context.dayRepository.getDay();
			selectLetter("1", context);
			selectLetter("@", context);
			selectLetter(" ", context);
			expect(getLetterSelectionFromAllGames(context.allGamesRepository.get(), day)).toBeNull();
			cleanup();
		});

		it("should replace previous symbol association when associating letter to a different symbol", () => {
			const [cleanup, context] = withGameStarted();
			const currentDay = context.dayRepository.getDay();
			
			// Créer association A->X
			selectLetter("A", context);
			selectSymbol("X", context);
			let cipher = getPlayerCipherFromAllGames(context.allGamesRepository.get(), currentDay);
			expect(cipher.A).toBe("X");
			expect(Object.values(cipher).includes("X")).toBe(true);
			expect(getLetterSelectionFromAllGames(context.allGamesRepository.get(), currentDay)).toBeNull();
			
			// Créer association A->Y: réselectionner A puis Y qui va remplacer X
			selectLetter("A", context);
			expect(getLetterSelectionFromAllGames(context.allGamesRepository.get(), currentDay)).toBe("A");
			selectSymbol("Y", context);
			cipher = getPlayerCipherFromAllGames(context.allGamesRepository.get(), currentDay);
			expect(cipher.A).toBe("Y");
			// Vérifier que X est bien supprimé (aucune clé ne devrait avoir la valeur "X")
			expect(Object.values(cipher).includes("X")).toBe(false);
			expect(getLetterSelectionFromAllGames(context.allGamesRepository.get(), currentDay)).toBeNull();
			cleanup();
		});
	});
});