import { useGameContext } from "./useGameContext";
import { useRealTodayDate } from "./useRealTodayDate";
import { encodeChallengeCode } from "../utils/encodeChallengeCode";

export const useTodayChallengeCode = (): string => {
	const gameContext = useGameContext();
	const realTodayDate = useRealTodayDate();
	const challenge = gameContext.challengeRepository.getChallenge();

	return encodeChallengeCode(challenge.id, realTodayDate, challenge.level);
};
