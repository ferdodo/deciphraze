import { describe, it, expect } from "vitest";
import { isDev } from "./isDev";

describe("isDev", () => {
	it("should return true if the environment is development", () => {
		expect(isDev()).toBe(true);
	});
});