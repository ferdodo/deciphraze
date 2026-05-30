import { describe, it, expect } from "vitest";
import { increaseCommandTextSize } from "./increaseCommandTextSize";
import { withGameStarted } from "../fixtures/withGameStarted";

describe("increaseCommandTextSize", () => {
	it("should increase command text size by 0.1", () => {
		const [cleanup, context] = withGameStarted();
		const initialSettings = context.settingsRepository.getSettings();
		const initialCommandTextSize = initialSettings.commandTextSize;
		
		increaseCommandTextSize(context);
		
		const newSettings = context.settingsRepository.getSettings();
		expect(newSettings.commandTextSize).toBe(initialCommandTextSize + 0.1);
		expect(newSettings.commandTextSize).toBeGreaterThan(initialCommandTextSize);
		expect(newSettings.commandTextSize - initialCommandTextSize).toBeCloseTo(0.1);
		cleanup();
	});
});


