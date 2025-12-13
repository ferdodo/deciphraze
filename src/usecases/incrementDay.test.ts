import { describe, it, expect } from "vitest";
import { incrementDay } from "./incrementDay";
import { withGameStarted } from "../fixtures/withGameStarted";

describe("incrementDay", () => {
	it("should increment day by 1", () => {
		const [cleanup, context] = withGameStarted();
		const initialDay = context.dayRepository.getDay();
		incrementDay(context);
		const newDay = context.dayRepository.getDay();
		
		const initialDate = new Date(initialDay);
		const expectedDate = new Date(initialDate);
		expectedDate.setDate(expectedDate.getDate() + 1);
		
		const expectedDay = `${expectedDate.getFullYear()}-${String(expectedDate.getMonth() + 1).padStart(2, '0')}-${String(expectedDate.getDate()).padStart(2, '0')}`;
		
		expect(newDay).toBe(expectedDay);
		cleanup();
	});

	it("should handle month change correctly", () => {
		const [cleanup, context] = withGameStarted();
		// Set to last day of a month (e.g., January 31)
		context.dayRepository.setDay("2024-01-31");
		incrementDay(context);
		const newDay = context.dayRepository.getDay();
		
		expect(newDay).toBe("2024-02-01");
		cleanup();
	});
});

