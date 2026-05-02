import type { Challenge } from "../entities/Challenge";

export interface ChallengeRepository {
	getChallenge(): Challenge;
	saveChallenge(challenge: Challenge): void;
	observeChallenge(listener: (challenge: Challenge) => void): () => void;
}
