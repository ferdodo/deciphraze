import { describe, it, expect } from "vitest";
import { increaseTextSize } from "./increaseTextSize";
import { withGameStarted } from "../fixtures/withGameStarted";

describe("increaseTextSize", () => {
	it("should increase text size by 0.1", () => {
		const [cleanup, context] = withGameStarted();
		const initialSettings = context.settingsRepository.getSettings();
		const initialTextSize = initialSettings.textSize;
		
		increaseTextSize(context);
		
		const newSettings = context.settingsRepository.getSettings();
		expect(newSettings.textSize).toBe(initialTextSize + 0.1);
		expect(newSettings.textSize).toBeGreaterThan(initialTextSize);
		expect(newSettings.textSize - initialTextSize).toBeCloseTo(0.1);
		cleanup();
	});
});


