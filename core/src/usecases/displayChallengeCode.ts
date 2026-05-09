import { encodeChallengeCode } from "../utils/encodeChallengeCode";
import { isTodayGameCompleted } from "../utils/isTodayGameCompleted";
import type { GameContext } from "../contexts/GameContext";

export function displayChallengeCode(gameContext: GameContext): string | null {
	const realTodayDate = gameContext.timeService.getRealDay().toString();
	const gameHistory = gameContext.gameHistoryRepository.getHistory();
	
	if (!isTodayGameCompleted(gameHistory, realTodayDate)) {
		return null;
	}

	const challenge = gameContext.challengeRepository.getChallenge();
	const code = encodeChallengeCode(challenge.id, realTodayDate, challenge.level, gameContext.randomService);

	gameContext.challengeContextRepository.saveContext({ code });
	return code;
}
