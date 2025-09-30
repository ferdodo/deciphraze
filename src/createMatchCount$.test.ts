import { describe, it, expect, beforeEach } from "vitest";
import { createMatchCount$ } from "./createMatchCount$";
import { createPlayerCipher } from "./createPlayerCipher";

describe("createMatchCount$", () => {
	let playerCipher: ReturnType<typeof createPlayerCipher>;

	beforeEach(() => {
		playerCipher = createPlayerCipher();
	});

	it("should start with 0 matches", async () => {
		const matchCount$ = createMatchCount$(playerCipher);

		matchCount$.subscribe((count) => {
			expect(count).toBe(0);
		});
	});

	it("should count matches when entries are added", async () => {
		const matchCount$ = createMatchCount$(playerCipher);
		let callCount = 0;

		matchCount$.subscribe((count) => {
			callCount++;
			if (callCount === 2) {
				expect(count).toBe(1);
			}
		});

		// Add an entry to trigger the observable
		playerCipher.addPlayerCipherEntry("A", "X");
	});

	it("should count multiple matches", async () => {
		const matchCount$ = createMatchCount$(playerCipher);
		let callCount = 0;

		matchCount$.subscribe((count) => {
			callCount++;
			if (callCount === 3) {
				expect(count).toBe(2);
			}
		});

		playerCipher.addPlayerCipherEntry("A", "X");
		playerCipher.addPlayerCipherEntry("B", "Y");
	});

	it("should handle empty cipher", async () => {
		const matchCount$ = createMatchCount$(playerCipher);

		matchCount$.subscribe((count) => {
			expect(count).toBe(0);
		});
	});
});
