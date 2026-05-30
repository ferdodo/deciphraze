import { useEffect, useState } from "react";
import { useGameContext } from "./useGameContext";
import type { ChallengeContext } from "@deciphraze/core";

export const useChallengeContext = (): ChallengeContext => {
	const gameContext = useGameContext();
	const [challengeContext, setChallengeContext] = useState<ChallengeContext>(
		gameContext.challengeContextRepository.getContext(),
	);

	useEffect(() => {
		const unsubscribe = gameContext.challengeContextRepository.observeContext(
			(newContext: ChallengeContext) => {
				setChallengeContext(newContext);
			},
		);

		return unsubscribe;
	}, [gameContext.challengeContextRepository]);

	return challengeContext;
};
