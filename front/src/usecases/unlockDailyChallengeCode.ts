import { encodeChallengeCode } from "../utils/encodeChallengeCode";
import type { GameContext } from "../contexts/GameContext";

/**
 * Unlock a daily challenge code for a specific level.
 * The player must have completed today's game to unlock the code.
 * The player can unlock codes for any level at or below their current level.
 * Returns the obfuscated code, or null if conditions are not met.
 */
export function unlockDailyChallengeCode(
	level: number,
	gameContext: GameContext
): string | null {
	// Get realDay from timeService
	const realDay = gameContext.timeService.getRealDay().toString();

	// Check if today's game is completed
	const gameHistory = gameContext.gameHistoryRepository.getHistory();
	const todaySession = gameHistory[realDay];
	if (!todaySession || Array.isArray(todaySession) || !todaySession.winAt) {
		return null;
	}

	// Get current challenge state
	const currentChallenge = gameContext.challengeRepository.getChallenge();
	const playerId = currentChallenge.id;

	// Check if level is valid (can only unlock up to current level + 1)
	if (level > currentChallenge.level + 1) {
		return null;
	}

	// Check if level is at least 1
	if (level < 1) {
		return null;
	}

	// Generate code for the requested level
	const code = encodeChallengeCode(playerId, realDay, level);

	// Update challenge state if this is a new level
	if (level > currentChallenge.level) {
		const updatedChallenge = {
			level,
			id: playerId,
		};
		gameContext.challengeRepository.saveChallenge(updatedChallenge);
	}

	return code;
}
