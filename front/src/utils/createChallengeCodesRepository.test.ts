import { describe, it, expect } from "vitest";
import { createChallengeCodesRepository } from "./createChallengeCodesRepository";
import type { ChallengeCodes } from "../entities/ChallengeCodes";

describe("createChallengeCodesRepository", () => {
	it("should create a repository with empty used codes", () => {
		const repo = createChallengeCodesRepository();

		const codes = repo.getCodes();

		expect(codes.usedCodes.size).toBe(0);
	});

	it("should add codes to the used set", () => {
		const repo = createChallengeCodesRepository();

		const newCodes = { usedCodes: new Set(["CODE1"]) };
		repo.saveCodes(newCodes);

		const retrieved = repo.getCodes();
		expect(retrieved.usedCodes.has("CODE1")).toBe(true);
	});

	it("should notify observers when codes are saved", () => {
		const repo = createChallengeCodesRepository();

		let observedCodes: ChallengeCodes | undefined;
		const unsubscribe = repo.observeCodes((codes) => {
			observedCodes = codes;
		});

		const newCodes = { usedCodes: new Set(["CODE1", "CODE2"]) };
		repo.saveCodes(newCodes);

		expect(observedCodes?.usedCodes.has("CODE1")).toBe(true);
		expect(observedCodes?.usedCodes.has("CODE2")).toBe(true);

		unsubscribe();
	});

	it("should allow unsubscribing observers", () => {
		const repo = createChallengeCodesRepository();

		let callCount = 0;
		const unsubscribe = repo.observeCodes(() => {
			callCount++;
		});

		repo.saveCodes({ usedCodes: new Set(["CODE1"]) });
		expect(callCount).toBe(1);

		unsubscribe();

		repo.saveCodes({ usedCodes: new Set(["CODE2"]) });
		expect(callCount).toBe(1);
	});

});
