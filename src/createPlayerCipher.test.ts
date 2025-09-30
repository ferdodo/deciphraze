import { describe, it, expect, beforeEach } from "vitest";
import { createPlayerCipher } from "./createPlayerCipher";

describe("createPlayerCipher", () => {
	let playerCipher: ReturnType<typeof createPlayerCipher>;

	beforeEach(() => {
		playerCipher = createPlayerCipher();
	});

	describe("Initialization", () => {
		it("should create empty cipher", () => {
			const cipher = playerCipher.getPlayerCipher();
			expect(cipher.size).toBe(0);
		});

		it("should emit initial empty cipher", async () => {
			playerCipher.playerCipher$.subscribe((cipher) => {
				expect(cipher.size).toBe(0);
			});
		});
	});

	describe("addPlayerCipherEntry", () => {
		it("should add new entry", () => {
			playerCipher.addPlayerCipherEntry("A", "X");
			const cipher = playerCipher.getPlayerCipher();

			expect(cipher.size).toBe(1);
			expect(cipher.get("A")).toBe("X");
		});

		it("should update existing entry", () => {
			playerCipher.addPlayerCipherEntry("A", "X");
			playerCipher.addPlayerCipherEntry("A", "Y");
			const cipher = playerCipher.getPlayerCipher();

			expect(cipher.size).toBe(1);
			expect(cipher.get("A")).toBe("Y");
		});

		it("should handle multiple entries", () => {
			playerCipher.addPlayerCipherEntry("A", "X");
			playerCipher.addPlayerCipherEntry("B", "Y");
			playerCipher.addPlayerCipherEntry("C", "Z");
			const cipher = playerCipher.getPlayerCipher();

			expect(cipher.size).toBe(3);
			expect(cipher.get("A")).toBe("X");
			expect(cipher.get("B")).toBe("Y");
			expect(cipher.get("C")).toBe("Z");
		});

		it("should emit updates when adding entries", async () => {
			const updates: Map<string, string>[] = [];

			playerCipher.playerCipher$.subscribe((cipher) => {
				updates.push(cipher);
			});

			playerCipher.addPlayerCipherEntry("A", "X");

			await new Promise((resolve) => setTimeout(resolve, 0));

			expect(updates.length).toBeGreaterThanOrEqual(1);
			expect(updates[updates.length - 1].get("A")).toBe("X");
		});
	});

	describe("removePlayerCipherEntryByLetter", () => {
		beforeEach(() => {
			playerCipher.addPlayerCipherEntry("A", "X");
			playerCipher.addPlayerCipherEntry("B", "Y");
		});

		it("should remove existing entry", () => {
			playerCipher.removePlayerCipherEntryByLetter("A");
			const cipher = playerCipher.getPlayerCipher();

			expect(cipher.size).toBe(1);
			expect(cipher.get("A")).toBeUndefined();
			expect(cipher.get("B")).toBe("Y");
		});

		it("should handle removing non-existent entry", () => {
			playerCipher.removePlayerCipherEntryByLetter("C");
			const cipher = playerCipher.getPlayerCipher();

			expect(cipher.size).toBe(2);
			expect(cipher.get("A")).toBe("X");
			expect(cipher.get("B")).toBe("Y");
		});

		it("should emit updates when removing entries", async () => {
			const updates: Map<string, string>[] = [];

			playerCipher.playerCipher$.subscribe((cipher) => {
				updates.push(cipher);
			});

			playerCipher.removePlayerCipherEntryByLetter("A");

			await new Promise((resolve) => setTimeout(resolve, 0));

			expect(updates.length).toBeGreaterThanOrEqual(1);
			expect(updates[updates.length - 1].get("A")).toBeUndefined();
		});
	});

	describe("removePlayerCipherEntryByValue", () => {
		beforeEach(() => {
			playerCipher.addPlayerCipherEntry("A", "X");
			playerCipher.addPlayerCipherEntry("B", "Y");
			playerCipher.addPlayerCipherEntry("C", "X"); // Same value as A
		});

		it("should remove entries with matching value", () => {
			playerCipher.removePlayerCipherEntryByValue("X");
			const cipher = playerCipher.getPlayerCipher();

			expect(cipher.size).toBe(1);
			expect(cipher.get("A")).toBeUndefined();
			expect(cipher.get("B")).toBe("Y");
			expect(cipher.get("C")).toBeUndefined();
		});

		it("should handle removing non-existent value", () => {
			playerCipher.removePlayerCipherEntryByValue("Z");
			const cipher = playerCipher.getPlayerCipher();

			expect(cipher.size).toBe(3);
			expect(cipher.get("A")).toBe("X");
			expect(cipher.get("B")).toBe("Y");
			expect(cipher.get("C")).toBe("X");
		});
	});

	describe("Observable behavior", () => {
		it("should share observable between multiple subscribers", () => {
			const subscriber1: Map<string, string>[] = [];
			const subscriber2: Map<string, string>[] = [];

			playerCipher.playerCipher$.subscribe((cipher) => {
				subscriber1.push(cipher);
			});

			playerCipher.playerCipher$.subscribe((cipher) => {
				subscriber2.push(cipher);
			});

			playerCipher.addPlayerCipherEntry("A", "X");

			// Both subscribers should receive the same updates
			expect(subscriber1.length).toBeGreaterThan(0);
			expect(subscriber2.length).toBeGreaterThan(0);
		});

		it("should return immutable copies", () => {
			const cipher1 = playerCipher.getPlayerCipher();
			playerCipher.addPlayerCipherEntry("A", "X");
			const cipher2 = playerCipher.getPlayerCipher();

			// Modifying cipher1 should not affect cipher2
			cipher1.set("B", "Y");
			expect(cipher2.get("B")).toBeUndefined();
		});
	});

	describe("Edge cases", () => {
		it("should handle empty strings", () => {
			playerCipher.addPlayerCipherEntry("", "");
			const cipher = playerCipher.getPlayerCipher();

			expect(cipher.size).toBe(1);
			expect(cipher.get("")).toBe("");
		});

		it("should handle special characters", () => {
			playerCipher.addPlayerCipherEntry("É", "À");
			const cipher = playerCipher.getPlayerCipher();

			expect(cipher.size).toBe(1);
			expect(cipher.get("É")).toBe("À");
		});

		it("should handle case sensitivity", () => {
			playerCipher.addPlayerCipherEntry("A", "X");
			playerCipher.addPlayerCipherEntry("a", "Y");
			const cipher = playerCipher.getPlayerCipher();

			expect(cipher.size).toBe(2);
			expect(cipher.get("A")).toBe("X");
			expect(cipher.get("a")).toBe("Y");
		});
	});
});
