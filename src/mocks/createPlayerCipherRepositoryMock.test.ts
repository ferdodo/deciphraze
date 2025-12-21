import { describe, it, expect } from "vitest";
import { createPlayerCipherRepositoryMock } from "./createPlayerCipherRepositoryMock";

describe("createPlayerCipherRepositoryMock", () => {
	describe("getPlayerCipher", () => {
		it("should return initial cipher when provided", () => {
			const mock = createPlayerCipherRepositoryMock({ A: "X", B: "Y" });
			const cipher = mock.getPlayerCipher();
			expect(cipher.A).toBe("X");
			expect(cipher.B).toBe("Y");
		});
	});

	describe("removePlayerCipherEntryByLetter", () => {
		it("should remove entry by letter", () => {
			const mock = createPlayerCipherRepositoryMock({ A: "X", B: "Y" });
			mock.removePlayerCipherEntryByLetter("A");
			const cipher = mock.getPlayerCipher();
			expect(cipher.A).toBeUndefined();
			expect(cipher.B).toBe("Y");
		});
	});

	describe("removePlayerCipherEntryByValue", () => {
		it("should remove first entry with matching value", () => {
			const mock = createPlayerCipherRepositoryMock({ A: "X", B: "Y", C: "X" });
			mock.removePlayerCipherEntryByValue("X");
			const cipher = mock.getPlayerCipher();
			// Devrait supprimer seulement la première correspondance (A) à cause du break
			expect(cipher.A).toBeUndefined();
			expect(cipher.B).toBe("Y");
			expect(cipher.C).toBe("X");
		});
	});

	describe("addPlayerCipherEntry", () => {
		it("should add new entry", () => {
			const mock = createPlayerCipherRepositoryMock();
			mock.addPlayerCipherEntry("A", "X");
			const cipher = mock.getPlayerCipher();
			expect(cipher.A).toBe("X");
		});

		it("should replace previous symbol association when adding entry", () => {
			const mock = createPlayerCipherRepositoryMock({ A: "X", B: "Y" });
			mock.addPlayerCipherEntry("C", "X");
			const cipher = mock.getPlayerCipher();
			// A->X devrait être supprimé car X est maintenant associé à C
			expect(cipher.A).toBeUndefined();
			expect(cipher.B).toBe("Y");
			expect(cipher.C).toBe("X");
		});
	});
});

