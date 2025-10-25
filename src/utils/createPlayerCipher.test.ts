import { describe, it, expect } from "vitest";
import { createPlayerCipher } from "./createPlayerCipher";

describe("createPlayerCipher", () => {

	describe("removePlayerCipherEntryByValue", () => {
		it("should remove entries with matching value", () => {
			const playerCipher = createPlayerCipher();
			playerCipher.addPlayerCipherEntry("A", "X");
			playerCipher.addPlayerCipherEntry("B", "Y");
			playerCipher.addPlayerCipherEntry("C", "X");
			playerCipher.removePlayerCipherEntryByValue("X");
			const cipher = playerCipher.getPlayerCipher();

			expect(Object.keys(cipher)).toHaveLength(1);
			expect(cipher.A).toBeUndefined();
			expect(cipher.B).toBe("Y");
			expect(cipher.C).toBeUndefined();
		});

	});

});
