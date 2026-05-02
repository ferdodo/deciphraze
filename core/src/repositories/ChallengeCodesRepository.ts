import type { ChallengeCodes } from "../entities/ChallengeCodes";

export interface ChallengeCodesRepository {
	getCodes(): ChallengeCodes;
	saveCodes(codes: ChallengeCodes): void;
	observeCodes(listener: (codes: ChallengeCodes) => void): () => void;
}
