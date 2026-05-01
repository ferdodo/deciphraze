import { describe, it, expect } from "vitest";
import { createChallengeCodesRepository } from "./createChallengeCodesRepository";
import type { ChallengeCodes } from "../entities/ChallengeCodes";
import type { StorageLike } from "./StorageLike";

class InMemoryStorage implements StorageLike {
	private data: Record<string, string> = {};

	getItem(key: string): string | null {
		return this.data[key] ?? null;
	}

	setItem(key: string, value: string): void {
		this.data[key] = value;
	}

	removeItem(key: string): void {
		delete this.data[key];
	}

	clear(): void {
		this.data = {};
	}

	get length(): number {
		return Object.keys(this.data).length;
	}

	key(index: number): string | null {
		const keys = Object.keys(this.data);
		return keys[index] ?? null;
	}
}

describe("createChallengeCodesRepository", () => {
	it("should create a repository with empty used codes", () => {
		const storage = new InMemoryStorage();
		const repo = createChallengeCodesRepository(storage);

		const codes = repo.getCodes();

		expect(codes.usedCodes.size).toBe(0);
	});

	it("should add codes to the used set", () => {
		const storage = new InMemoryStorage();
		const repo = createChallengeCodesRepository(storage);

		const newCodes = { usedCodes: new Set(["CODE1"]) };
		repo.saveCodes(newCodes);

		const retrieved = repo.getCodes();
		expect(retrieved.usedCodes.has("CODE1")).toBe(true);
	});



	it("should notify observers when codes are saved", () => {
		const storage = new InMemoryStorage();
		const repo = createChallengeCodesRepository(storage);

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
		const storage = new InMemoryStorage();
		const repo = createChallengeCodesRepository(storage);

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

	it("should persist codes to localStorage", () => {
		const storage = new InMemoryStorage();
		const repo = createChallengeCodesRepository(storage);

		const newCodes = { usedCodes: new Set(["CODE1", "CODE2"]) };
		repo.saveCodes(newCodes);

		// Verify it was persisted to storage
		const stored = storage.getItem("deciphraze_challenge_codes");
		expect(stored).toBeDefined();
		const parsed = JSON.parse(stored!);
		expect(Array.isArray(parsed.usedCodes)).toBe(true);
		expect(parsed.usedCodes).toContain("CODE1");
		expect(parsed.usedCodes).toContain("CODE2");
	});

	it("should restore codes from localStorage", () => {
		const storage = new InMemoryStorage();
		storage.setItem("deciphraze_challenge_codes", JSON.stringify({
			usedCodes: ["CODE1", "CODE2", "CODE3"]
		}));

		const repo = createChallengeCodesRepository(storage);
		const codes = repo.getCodes();

		expect(codes.usedCodes.size).toBe(3);
		expect(codes.usedCodes.has("CODE1")).toBe(true);
		expect(codes.usedCodes.has("CODE2")).toBe(true);
		expect(codes.usedCodes.has("CODE3")).toBe(true);
	});

	it("should handle invalid JSON in localStorage gracefully", () => {
		const storage = new InMemoryStorage();
		storage.setItem("deciphraze_challenge_codes", "invalid json");

		const repo = createChallengeCodesRepository(storage);
		const codes = repo.getCodes();

		expect(codes.usedCodes.size).toBe(0);
	});

	it("should handle malformed data in localStorage gracefully", () => {
		const storage = new InMemoryStorage();
		storage.setItem("deciphraze_challenge_codes", JSON.stringify({
			invalidKey: ["CODE1"]
		}));

		const repo = createChallengeCodesRepository(storage);
		const codes = repo.getCodes();

		expect(codes.usedCodes.size).toBe(0);
	});


});
