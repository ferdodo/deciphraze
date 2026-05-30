import { describe, it, expect } from "vitest";
import { decreaseCommandTextSize } from "./decreaseCommandTextSize";
import { withGameStarted } from "../fixtures/withGameStarted";

describe("decreaseCommandTextSize", () => {
	it("should decrease command text size by 0.1", () => {
		const [cleanup, context] = withGameStarted();
		const initialSettings = context.settingsRepository.getSettings();
		const initialCommandTextSize = initialSettings.commandTextSize;
		
		decreaseCommandTextSize(context);
		
		const newSettings = context.settingsRepository.getSettings();
		expect(newSettings.commandTextSize).toBe(initialCommandTextSize - 0.1);
		expect(newSettings.commandTextSize).toBeLessThan(initialCommandTextSize);
		expect(initialCommandTextSize - newSettings.commandTextSize).toBeCloseTo(0.1);
		cleanup();
	});
});



