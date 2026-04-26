import { describe, it, expect } from "vitest";
import { unobfuscateChallengeCode } from "./unobfuscateChallengeCode";
import { obfuscateChallengeCode } from "./obfuscateChallengeCode";

describe("unobfuscateChallengeCode", () => {
	it("should return null for tampered checksum", () => {
		const original = "01202604256X9K";
		const obfuscated = obfuscateChallengeCode(original);

		const tampered = obfuscated.substring(0, 14) + "XX";
		const recovered = unobfuscateChallengeCode(tampered);

		expect(recovered).toBeNull();
	});

});

