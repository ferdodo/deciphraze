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
});

