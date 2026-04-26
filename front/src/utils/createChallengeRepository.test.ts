import { describe, it, expect } from "vitest";
import { createChallengeRepository } from "./createChallengeRepository";
import { createLocalStorageMock } from "./createLocalStorageMock";

describe("createChallengeRepository", () => {
	it("should create a repository with default challenge state", () => {
		const storage = createLocalStorageMock();
		const repo = createChallengeRepository(storage);

		const challenge = repo.getChallenge();

		expect(challenge.level).toBe(0);
		expect(challenge.id).toBeDefined();
	});

	it("should persist and retrieve challenge state", () => {
		const storage = createLocalStorageMock();
		const repo = createChallengeRepository(storage);

		const newChallenge = { level: 3, id: "player-1" };
		repo.saveChallenge(newChallenge);

		const retrieved = repo.getChallenge();
		expect(retrieved.level).toBe(3);
		expect(retrieved.id).toBe("player-1");
	});

	it("should restore state from localStorage", () => {
		const storage = createLocalStorageMock();
		storage.setItem(
			"deciphraze_challenge",
			JSON.stringify({ level: 5, id: "saved-player" })
		);

		const repo = createChallengeRepository(storage);
		const challenge = repo.getChallenge();

		expect(challenge.level).toBe(5);
		expect(challenge.id).toBe("saved-player");
	});

	it("should notify observers when challenge is saved", () => {
		const storage = createLocalStorageMock();
		const repo = createChallengeRepository(storage);

		let observedChallenge = null;
		const unsubscribe = repo.observeChallenge((challenge) => {
			observedChallenge = challenge;
		});

		const newChallenge = { level: 2, id: "player-2" };
		repo.saveChallenge(newChallenge);

		expect(observedChallenge).toEqual(newChallenge);

		unsubscribe();
	});

	it("should allow unsubscribing observers", () => {
		const storage = createLocalStorageMock();
		const repo = createChallengeRepository(storage);

		let callCount = 0;
		const unsubscribe = repo.observeChallenge(() => {
			callCount++;
		});

		repo.saveChallenge({ level: 1, id: "player-1" });
		expect(callCount).toBe(1);

		unsubscribe();

		repo.saveChallenge({ level: 2, id: "player-2" });
		expect(callCount).toBe(1);
	});

	it("should handle invalid stored data", () => {
		const storage = createLocalStorageMock();
		storage.setItem("deciphraze_challenge", "invalid json");

		const repo = createChallengeRepository(storage);
		const challenge = repo.getChallenge();

		expect(challenge.level).toBe(0);
		expect(challenge.id).toBeDefined();
	});

});

