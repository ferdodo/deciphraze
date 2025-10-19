import { describe, it, expect } from "vitest";
import { createShareMessage } from "./createShareMessage";

describe("createShareMessage", () => {
	it("should create message with correct format", () => {
		const message = createShareMessage(5);

		expect(message).toContain("Deciphraze");
		expect(message).toContain("5 associations de lettres");
		expect(message).toContain("https://ferdodo.github.io/deciphraze");
	});

	it("should include date in correct format", () => {
		const message = createShareMessage(3);
		const today = new Date();
		const expectedDate = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;
		
		expect(message).toContain(expectedDate);
	});

});
