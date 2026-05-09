import { describe, it, expect } from "vitest";
import { getChallengeWordForLevelAndDay } from "./getChallengeWordForLevelAndDay";
import { createRandomServiceMock } from "./createRandomServiceMock";
import { getSevenLetterWords } from "./getSevenLetterWords";
import type { RandomService } from "../services/RandomService";

describe("getChallengeWordForLevelAndDay", () => {
	it("should return a string", () => {
		const randomService = createRandomServiceMock();
		const word = getChallengeWordForLevelAndDay(1, "2024-01-01", randomService);
		expect(typeof word).toBe("string");
	});

	it("should return different words for different levels", () => {
		const randomService = createRandomServiceMock();
		const word1 = getChallengeWordForLevelAndDay(1, "2024-01-01", randomService);
		const word2 = getChallengeWordForLevelAndDay(2, "2024-01-01", randomService);
		expect(word1).not.toBe(word2);
	});

	it("should use the correct bounds for array index", () => {
		const words = getSevenLetterWords();
		const callLog: Array<{ min: number; max: number }> = [];

		const mockRandomService: RandomService = {
			createIntPRNG: (_seed: string) => {
				return (min: number, max: number) => {
					callLog.push({ min, max });
					// Return a valid index
					return 0;
				};
			},
		};

		getChallengeWordForLevelAndDay(1, "2024-01-01", mockRandomService);

		// Verify randomInt was called with correct bounds
		expect(callLog).toHaveLength(1);
		expect(callLog[0]).toEqual({ min: 0, max: words.length - 1 });
	});
});
