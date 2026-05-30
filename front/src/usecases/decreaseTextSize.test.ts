import { describe, it, expect } from "vitest";
import { decreaseTextSize } from "./decreaseTextSize";
import { withGameStarted } from "../fixtures/withGameStarted";

describe("decreaseTextSize", () => {
	it("should decrease text size by 0.1", () => {
		const [cleanup, context] = withGameStarted();
		const initialSettings = context.settingsRepository.getSettings();
		const initialTextSize = initialSettings.textSize;
		
		decreaseTextSize(context);
		
		const newSettings = context.settingsRepository.getSettings();
		expect(newSettings.textSize).toBe(initialTextSize - 0.1);
		expect(newSettings.textSize).toBeLessThan(initialTextSize);
		expect(initialTextSize - newSettings.textSize).toBeCloseTo(0.1);
		cleanup();
	});
});



