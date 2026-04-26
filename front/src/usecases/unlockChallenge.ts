import { getChallengeWordForLevelAndDay } from "../utils/getChallengeWordForLevelAndDay";
import { normalizeWord } from "../utils/normalizeWord";
import type { GameContext } from "../contexts/GameContext";

/**
 * Attempt to unlock the next challenge level by submitting a word.
 * If the word matches the challenge word for today's next level, advances the level.
 * Otherwise, does nothing.
 */
export function unlockChallenge(
	guessedWord: string,
	gameContext: GameContext
): void {
	// Get realDay from timeService
	const realDay = gameContext.timeService.getRealDay().toString();

	// Get current challenge state
	const currentChallenge = gameContext.challengeRepository.getChallenge();
	const nextLevel = currentChallenge.level + 1;

	// Get the expected word for this level and day
	const expectedWord = getChallengeWordForLevelAndDay(nextLevel, realDay);

	// Normalize both words for comparison
	const normalizedGuess = normalizeWord(guessedWord).toLowerCase();
	const normalizedExpected = normalizeWord(expectedWord).toLowerCase();

	// Check if word is correct
	if (normalizedGuess !== normalizedExpected) {
		return;
	}

	// Word is correct, advance the level
	const updatedChallenge = {
		level: nextLevel,
		id: currentChallenge.id,
	};
	gameContext.challengeRepository.saveChallenge(updatedChallenge);
}
