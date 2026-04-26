import type { GameContext } from "../contexts/GameContext";

/**
 * Mark a code as used for the daily challenge letter.
 * Simply adds the code to the used codes set.
 */
export function unlockChallengeLetter(code: string, gameContext: GameContext): void {
	const currentCodes = gameContext.challengeCodesRepository.getCodes();
	const updatedCodes = {
		usedCodes: new Set(currentCodes.usedCodes),
	};
	updatedCodes.usedCodes.add(code);
	gameContext.challengeCodesRepository.saveCodes(updatedCodes);
}
