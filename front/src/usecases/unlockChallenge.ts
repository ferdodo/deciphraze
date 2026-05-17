import { getChallengeWordForLevelAndDay, normalizeWord } from "@deciphraze/core";
import type { GameContext } from "@deciphraze/core";

/**
 * Attempt to unlock the next challenge level by submitting a word.
 * If the word matches the challenge word for today's next level, advances the level.
 * Displays appropriate notifications via browserService.
 */
export function unlockChallenge(
	guessedWord: string,
	gameContext: GameContext,
): void {
	// Get realDay from timeService
	const realDay = gameContext.timeService.getRealDay().toString();

	// Get current challenge state
	const currentChallenge = gameContext.challengeRepository.getChallenge();
	const nextLevel = currentChallenge.level + 1;

	// Get the expected word for the current level and day
	// (the word displayed to the user is from their current level)
	const expectedWord = getChallengeWordForLevelAndDay(currentChallenge.level, realDay, gameContext.randomService);

	// Normalize both words for comparison
	const normalizedGuess = normalizeWord(guessedWord).toLowerCase();
	const normalizedExpected = normalizeWord(expectedWord).toLowerCase();

	// Check if word is correct
	if (normalizedGuess !== normalizedExpected) {
		gameContext.browserService.confirm(`Ce n'est pas le bon mot`);
		return;
	}

	// Word is correct, advance the level
	const updatedChallenge = {
		level: nextLevel,
		id: currentChallenge.id,
	};
	gameContext.challengeRepository.saveChallenge(updatedChallenge);
	gameContext.browserService.confirm(`Bravo! Vous passez au niveau ${nextLevel}`);
}
