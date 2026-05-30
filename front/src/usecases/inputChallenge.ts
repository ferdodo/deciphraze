import { getChallengeWordForLevelAndDay, normalizeWord } from "@deciphraze/core";
import type { GameContext } from "@deciphraze/core";

/**
 * Process challenge input based on length.
 * - If 7 characters: attempt to unlock the next challenge level
 * - Otherwise: add the input as a challenge code
 */
export function inputChallenge(
	input: string,
	gameContext: GameContext,
): void {
	if (input.length === 7) {
		attemptWordSubmission(input, gameContext);
	} else {
		addCodeSubmission(input, gameContext);
	}
}

function attemptWordSubmission(guessedWord: string, gameContext: GameContext): void {
	const realDay = gameContext.timeService.getRealDay().toString();
	const currentChallenge = gameContext.challengeRepository.getChallenge();
	const nextLevel = currentChallenge.level + 1;

	const expectedWord = getChallengeWordForLevelAndDay(currentChallenge.level, realDay, gameContext.randomService);

	const normalizedGuess = normalizeWord(guessedWord).toLowerCase();
	const normalizedExpected = normalizeWord(expectedWord).toLowerCase();

	if (normalizedGuess !== normalizedExpected) {
		gameContext.browserService.confirm(`Ce n'est pas le bon mot`);
		return;
	}

	const updatedChallenge = {
		level: nextLevel,
		id: currentChallenge.id,
	};
	gameContext.challengeRepository.saveChallenge(updatedChallenge);
	gameContext.browserService.confirm(`Bravo! Vous passez au niveau ${nextLevel}`);
}

function addCodeSubmission(code: string, gameContext: GameContext): void {
	const currentCodes = gameContext.challengeCodesRepository.getCodes();
	const updatedCodes = {
		usedCodes: new Set(currentCodes.usedCodes),
	};
	updatedCodes.usedCodes.add(code);
	gameContext.challengeCodesRepository.saveCodes(updatedCodes);
}
