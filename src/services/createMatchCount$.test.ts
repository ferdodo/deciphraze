import { describe, it, expect } from "vitest";
import { createMatchCount$ } from "./createMatchCount$";
import { createPlayerCipher } from "./createPlayerCipher";

describe("createMatchCount$", () => {
	let playerCipher: ReturnType<typeof createPlayerCipher>;

	it("should start with 0 matches", async () => {
		playerCipher = createPlayerCipher();
		const matchCount$ = createMatchCount$(playerCipher);

		matchCount$.subscribe((count) => {
			expect(count).toBe(0);
		});
	});

});
