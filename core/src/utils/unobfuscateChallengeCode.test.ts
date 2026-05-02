import { describe, it, expect } from "vitest";
import { unobfuscateChallengeCode } from "./unobfuscateChallengeCode";
import { obfuscateChallengeCode } from "./obfuscateChallengeCode";
import { createRandomServiceMock } from "./createRandomServiceMock";

describe("unobfuscateChallengeCode", () => {
	it("should return null for tampered checksum", () => {
		const original = "01202604256X9K";
		const randomService = createRandomServiceMock();
		const obfuscated = obfuscateChallengeCode(original, randomService);

		const tampered = `${obfuscated.substring(0, 14)}XX`;
		const recovered = unobfuscateChallengeCode(tampered, randomService);

		expect(recovered).toBeNull();
	});
});

