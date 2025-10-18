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

	describe("localStorage persistence", () => {

		it("should load from localStorage on initialization", () => {
			localStorage.setItem("deciphraze_player_cipher", '{"B":"Y"}');
			const newPlayerCipher = createPlayerCipher();
			const cipher = newPlayerCipher.getPlayerCipher();
			
			expect(cipher.B).toBe("Y");
		});

	});

});
