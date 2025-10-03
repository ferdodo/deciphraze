import { describe, it, expect } from "vitest";
import { createPlayerCipher } from "./createPlayerCipher";

describe("createPlayerCipher", () => {
	let playerCipher: ReturnType<typeof createPlayerCipher>;

	describe("Initialization", () => {
		it("should create empty cipher", () => {
			playerCipher = createPlayerCipher();
			const cipher = playerCipher.getPlayerCipher();
			expect(cipher.size).toBe(0);
		});

		it("should emit initial empty cipher", async () => {
			playerCipher = createPlayerCipher();
			playerCipher.playerCipher$.subscribe((cipher) => {
				expect(cipher.size).toBe(0);
			});
		});
	});

	describe("addPlayerCipherEntry", () => {
		it("should add new entry", () => {
			playerCipher = createPlayerCipher();
			playerCipher.addPlayerCipherEntry("A", "X");
			const cipher = playerCipher.getPlayerCipher();

			expect(cipher.size).toBe(1);
			expect(cipher.get("A")).toBe("X");
		});

		it("should update existing entry", () => {
			playerCipher = createPlayerCipher();
			playerCipher.addPlayerCipherEntry("A", "X");
			playerCipher.addPlayerCipherEntry("A", "Y");
			const cipher = playerCipher.getPlayerCipher();

			expect(cipher.size).toBe(1);
			expect(cipher.get("A")).toBe("Y");
		});

		it("should handle multiple entries", () => {
			playerCipher = createPlayerCipher();
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
			playerCipher = createPlayerCipher();
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
		it("should remove existing entry", () => {
			playerCipher = createPlayerCipher();
			playerCipher.addPlayerCipherEntry("A", "X");
			playerCipher.addPlayerCipherEntry("B", "Y");
			playerCipher.removePlayerCipherEntryByLetter("A");
			const cipher = playerCipher.getPlayerCipher();

			expect(cipher.size).toBe(1);
			expect(cipher.get("A")).toBeUndefined();
			expect(cipher.get("B")).toBe("Y");
		});

		it("should handle removing non-existent entry", () => {
			playerCipher = createPlayerCipher();
			playerCipher.addPlayerCipherEntry("A", "X");
			playerCipher.addPlayerCipherEntry("B", "Y");
			playerCipher.removePlayerCipherEntryByLetter("C");
			const cipher = playerCipher.getPlayerCipher();

			expect(cipher.size).toBe(2);
			expect(cipher.get("A")).toBe("X");
			expect(cipher.get("B")).toBe("Y");
		});

		it("should emit updates when removing entries", async () => {
			playerCipher = createPlayerCipher();
			playerCipher.addPlayerCipherEntry("A", "X");
			playerCipher.addPlayerCipherEntry("B", "Y");
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
		it("should remove entries with matching value", () => {
			playerCipher = createPlayerCipher();
			playerCipher.addPlayerCipherEntry("A", "X");
			playerCipher.addPlayerCipherEntry("B", "Y");
			playerCipher.addPlayerCipherEntry("C", "X");
			playerCipher.removePlayerCipherEntryByValue("X");
			const cipher = playerCipher.getPlayerCipher();

			expect(cipher.size).toBe(1);
			expect(cipher.get("A")).toBeUndefined();
			expect(cipher.get("B")).toBe("Y");
			expect(cipher.get("C")).toBeUndefined();
		});

		it("should handle removing non-existent value", () => {
			playerCipher = createPlayerCipher();
			playerCipher.addPlayerCipherEntry("A", "X");
			playerCipher.addPlayerCipherEntry("B", "Y");
			playerCipher.addPlayerCipherEntry("C", "X");
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
			playerCipher = createPlayerCipher();
			const subscriber1: Map<string, string>[] = [];
			const subscriber2: Map<string, string>[] = [];

			playerCipher.playerCipher$.subscribe((cipher) => {
				subscriber1.push(cipher);
			});

			playerCipher.playerCipher$.subscribe((cipher) => {
				subscriber2.push(cipher);
			});

			playerCipher.addPlayerCipherEntry("A", "X");

			expect(subscriber1.length).toBeGreaterThan(0);
			expect(subscriber2.length).toBeGreaterThan(0);
		});

		it("should return immutable copies", () => {
			playerCipher = createPlayerCipher();
			const cipher1 = playerCipher.getPlayerCipher();
			playerCipher.addPlayerCipherEntry("A", "X");
			const cipher2 = playerCipher.getPlayerCipher();

			cipher1.set("B", "Y");
			expect(cipher2.get("B")).toBeUndefined();
		});
	});

	describe("Edge cases", () => {
		it("should handle empty strings", () => {
			playerCipher = createPlayerCipher();
			playerCipher.addPlayerCipherEntry("", "");
			const cipher = playerCipher.getPlayerCipher();

			expect(cipher.size).toBe(1);
			expect(cipher.get("")).toBe("");
		});

		it("should handle special characters", () => {
			playerCipher = createPlayerCipher();
			playerCipher.addPlayerCipherEntry("É", "À");
			const cipher = playerCipher.getPlayerCipher();

			expect(cipher.size).toBe(1);
			expect(cipher.get("É")).toBe("À");
		});

		it("should handle case sensitivity", () => {
			playerCipher = createPlayerCipher();
			playerCipher.addPlayerCipherEntry("A", "X");
			playerCipher.addPlayerCipherEntry("a", "Y");
			const cipher = playerCipher.getPlayerCipher();

			expect(cipher.size).toBe(2);
			expect(cipher.get("A")).toBe("X");
			expect(cipher.get("a")).toBe("Y");
		});
	});
});
