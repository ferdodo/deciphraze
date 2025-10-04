import { describe, it, expect } from "vitest";
import { createPlayerCipher } from "./createPlayerCipher";

describe("createPlayerCipher", () => {
	let playerCipher: ReturnType<typeof createPlayerCipher>;

	describe("addPlayerCipherEntry", () => {
		it("should add new entry", () => {
			playerCipher = createPlayerCipher();
			playerCipher.addPlayerCipherEntry("A", "X");
			const cipher = playerCipher.getPlayerCipher();

			expect(cipher.size).toBe(1);
			expect(cipher.get("A")).toBe("X");
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
	});
});
