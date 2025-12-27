import { describe, it, expect } from "vitest";
import { firstValueFrom } from "rxjs";
import { skip } from "rxjs/operators";
import { createPlayerCipher } from "./createPlayerCipher";

describe("createPlayerCipher", () => {

	describe("removePlayerCipherEntryByLetter", () => {
		it("should emit updated cipher when removing entry by letter", async () => {
			const playerCipher = createPlayerCipher();
			playerCipher.addPlayerCipherEntry("A", "X");
			playerCipher.addPlayerCipherEntry("B", "Y");
			
			// Créer la promesse avant la suppression, skip(1) pour sauter l'émission actuelle
			const cipherPromise = firstValueFrom(playerCipher.playerCipher$.pipe(skip(1)));
			playerCipher.removePlayerCipherEntryByLetter("A");
			
			const cipher = await cipherPromise;
			expect(cipher.A).toBeUndefined();
			expect(cipher.B).toBe("Y");
		});
	});

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

		it("should emit updated cipher when removing entry by value", async () => {
			const playerCipher = createPlayerCipher();
			playerCipher.addPlayerCipherEntry("A", "X");
			playerCipher.addPlayerCipherEntry("B", "Y");
			playerCipher.addPlayerCipherEntry("C", "X");
			
			// Créer la promesse avant la suppression, skip(1) pour sauter l'émission actuelle
			const cipherPromise = firstValueFrom(playerCipher.playerCipher$.pipe(skip(1)));
			playerCipher.removePlayerCipherEntryByValue("X");
			
			const cipher = await cipherPromise;
			expect(cipher.A).toBeUndefined();
			expect(cipher.B).toBe("Y");
			expect(cipher.C).toBeUndefined();
		});
	});

});
