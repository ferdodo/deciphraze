import { describe, it, expect } from "vitest";
import { getChallengeWordForLevelAndDay } from "./getChallengeWordForLevelAndDay";
import { createRandomServiceMock } from "./createRandomServiceMock";

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
});
