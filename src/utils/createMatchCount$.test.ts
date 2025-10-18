import { describe, it, expect } from "vitest";
import { skip } from "rxjs/operators";
import { createMatchCount$ } from "./createMatchCount$";
import { createPlayerCipher } from "./createPlayerCipher";

describe("createMatchCount$", () => {
	it("should start with 0 matches", async () => {
		const playerCipher = createPlayerCipher();
		const matchCount$ = createMatchCount$(playerCipher);

		return new Promise<void>((resolve) => {
			matchCount$.subscribe((count) => {
				expect(count).toBe(0);
				resolve();
			});
		});
	});

	it("should count matches when player cipher has entries", async () => {
		const playerCipher = createPlayerCipher();
		playerCipher.addPlayerCipherEntry("A", "X");
		playerCipher.addPlayerCipherEntry("B", "Y");

		const matchCount$ = createMatchCount$(playerCipher);

		return new Promise<void>((resolve) => {
			matchCount$.subscribe((count) => {
				expect(count).toBe(2);
				resolve();
			});
		});
	});

	it("should update count when player cipher changes", async () => {
		// Clear localStorage to ensure clean state
		localStorage.clear();
		const playerCipher = createPlayerCipher();
		const matchCount$ = createMatchCount$(playerCipher);

		return new Promise<void>((resolve) => {
			// Skip initial emission and wait for the change
			matchCount$.pipe(skip(1)).subscribe((count) => {
				expect(count).toBe(1);
				resolve();
			});
			// Trigger the change
			playerCipher.addPlayerCipherEntry("A", "X");
		});
	});

});
