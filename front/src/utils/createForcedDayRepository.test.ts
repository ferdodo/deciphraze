import { describe, expect, it } from "vitest";
import { createForcedDayRepository } from "./createForcedDayRepository";

describe("createForcedDayRepository", () => {
	it("should clear the forced day", () => {
		const repository = createForcedDayRepository();

		repository.forceVirtualDate("2024-01-16");
		repository.clear();

		expect(repository.getForcedVirtualDate()).toBeUndefined();
	});
});
