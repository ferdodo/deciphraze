import type { ChallengeContext } from "../entities/ChallengeContext";

export interface ChallengeContextRepository {
	getContext(): ChallengeContext;
	saveContext(context: ChallengeContext): void;
	observeContext(listener: (context: ChallengeContext) => void): () => void;
}
