import { describe, it, expect } from "vitest";
import { createShareMessage } from "./createShareMessage";

describe("createShareMessage", () => {
	it("should create message with correct format", () => {
		const message = createShareMessage(5);

		expect(message).toContain("Deciphraze");
		expect(message).toContain("5 associations");
		expect(message).toContain("https://ferdodo.github.io/deciphraze");
	});


});
