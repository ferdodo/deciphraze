import { useGameContext } from "./useGameContext";
import { useRealTodayDate } from "./useRealTodayDate";
import { encodeChallengeCode } from "@deciphraze/core";

export const useTodayChallengeCode = (): string => {
	const gameContext = useGameContext();
	const realTodayDate = useRealTodayDate();
	const challenge = gameContext.challengeRepository.getChallenge();

	return encodeChallengeCode(challenge.id, realTodayDate, challenge.level, gameContext.randomService);
};
