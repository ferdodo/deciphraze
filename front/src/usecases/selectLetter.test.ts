import { describe, it, expect } from "vitest";
import { selectLetter } from "./selectLetter";
import { withGameStarted } from "../fixtures/withGameStarted";
import { getLetterSelectionFromAllGames } from "../utils/getLetterSelectionFromAllGames";
import { getCurrentDay } from "../utils/getCurrentDay";

describe("selectLetter", () => {

	describe("Basic selection", () => {
		it("should deselect letter if already selected", () => {
			const [cleanup, context] = withGameStarted();
			const day = getCurrentDay(context.timeService, context.forcedDayRepository);
			
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
			const day = getCurrentDay(context.timeService, context.forcedDayRepository);
			selectLetter("1", context);
			selectLetter("@", context);
			selectLetter(" ", context);
			expect(getLetterSelectionFromAllGames(context.allGamesRepository.get(), day)).toBeNull();
			cleanup();
		});
	});
});
