import { describe, it, expect } from "vitest";
import { createSettingsRepository } from "./createSettingsRepository";
import type { Settings } from "../entities/Settings";
import { createLocalStorageMock } from "./createLocalStorageMock";
import { getDefaultTextSize } from "./getDefaultTextSize";

describe("createSettingsRepository", () => {
	it("should load valid settings from localStorage", () => {
		const storage = createLocalStorageMock();
		const validSettings: Settings = {
			pullToRefreshEnabled: false,
			hideInstructions: true,
			showAssociationHistory: false,
			showGameDayDate: true,
			textSize: 0,
			commandTextSize: getDefaultTextSize(),
		};
		storage.setItem("deciphraze_settings", JSON.stringify(validSettings));

		const repository = createSettingsRepository(storage);
		const settings = repository.getSettings();

		expect(settings.pullToRefreshEnabled).toBe(false);
		expect(settings.hideInstructions).toBe(true);
	});

	it("should use default value for invalid pullToRefreshEnabled", () => {
		const storage = createLocalStorageMock();
		const invalidSettings = {
			pullToRefreshEnabled: "not a boolean",
			hideInstructions: true,
		};
		storage.setItem("deciphraze_settings", JSON.stringify(invalidSettings));

		const repository = createSettingsRepository(storage);
		const settings = repository.getSettings();

		expect(settings.pullToRefreshEnabled).toBe(false); // Default value
		expect(settings.hideInstructions).toBe(true);
	});

	it("should use default value for invalid hideInstructions", () => {
		const storage = createLocalStorageMock();
		const invalidSettings = {
			pullToRefreshEnabled: false,
			hideInstructions: "not a boolean",
		};
		storage.setItem("deciphraze_settings", JSON.stringify(invalidSettings));

		const repository = createSettingsRepository(storage);
		const settings = repository.getSettings();

		expect(settings.pullToRefreshEnabled).toBe(false);
		expect(settings.hideInstructions).toBe(false); // Default value
	});

	it("should use default value for invalid textSize", () => {
		const storage = createLocalStorageMock();
		const invalidSettings = {
			pullToRefreshEnabled: false,
			hideInstructions: false,
			textSize: "not a number",
		};
		storage.setItem("deciphraze_settings", JSON.stringify(invalidSettings));

		const repository = createSettingsRepository(storage);
		const settings = repository.getSettings();

		expect(settings.pullToRefreshEnabled).toBe(false);
		expect(settings.hideInstructions).toBe(false);
		expect(settings.textSize).toBe(1.4); // Default value from createSettingsRepository.ts
	});

	it("should emit settings changes through settings$ observable", async () => {
		const storage = createLocalStorageMock();
		const repository = createSettingsRepository(storage);
		const receivedSettings: Settings[] = [];

		await new Promise<void>((resolve) => {
			const subscription = repository.settings$.subscribe((settings: Settings) => {
				receivedSettings.push({ ...settings });
				if (receivedSettings.length === 2) {
					expect(receivedSettings[0].pullToRefreshEnabled).toBe(false);
					expect(receivedSettings[0].hideInstructions).toBe(false);
					expect(receivedSettings[1].pullToRefreshEnabled).toBe(false);
					expect(receivedSettings[1].hideInstructions).toBe(true);
					subscription.unsubscribe();
					resolve();
				}
			});

			repository.saveSettings({
				pullToRefreshEnabled: false,
				hideInstructions: true,
				showAssociationHistory: false,
				showGameDayDate: false,
				textSize: 0,
				commandTextSize: getDefaultTextSize(),
			});
		});
	});

	it("should handle non-object parsed data", () => {
		const storage = createLocalStorageMock();
		storage.setItem("deciphraze_settings", '"just a string"');

		const repository = createSettingsRepository(storage);
		const settings = repository.getSettings();

		expect(settings.pullToRefreshEnabled).toBe(false);
		expect(settings.hideInstructions).toBe(false);
	});

	it("should use default settings when localStorage contains invalid JSON", () => {
		const storage = createLocalStorageMock();
		// Set an invalid JSON string that will cause JSON.parse to throw an error
		storage.setItem("deciphraze_settings", "{invalid json");

		const repository = createSettingsRepository(storage);
		const settings = repository.getSettings();

		expect(settings.pullToRefreshEnabled).toBe(false);
		expect(settings.hideInstructions).toBe(false);
		expect(settings.textSize).toBe(1.4);
	});

	it("should use default for commandTextSize when value is invalid", () => {
		const storage = createLocalStorageMock();
		storage.setItem("deciphraze_settings", JSON.stringify({
			pullToRefreshEnabled: false,
			hideInstructions: false,
			showAssociationHistory: false,
			showGameDayDate: false,
			textSize: 1.4,
			commandTextSize: "invalid",
		}));

		const repository = createSettingsRepository(storage);
		const settings = repository.getSettings();

		expect(settings.commandTextSize).toBe(1.4);
	});

	it("should handle stored settings with missing commandTextSize field", () => {
		const storage = createLocalStorageMock();
		const legacySettings = {
			pullToRefreshEnabled: true,
			hideInstructions: false,
			textSize: 2,
		};
		storage.setItem("deciphraze_settings", JSON.stringify(legacySettings));

		const repository = createSettingsRepository(storage);
		const settings = repository.getSettings();

		expect(settings.pullToRefreshEnabled).toBe(true);
		expect(settings.hideInstructions).toBe(false);
		expect(settings.textSize).toBe(2);
		expect(settings.commandTextSize).toBe(1.4);
	});

	it("should use showGameDayDate: true when loaded from localStorage", () => {
		const storage = createLocalStorageMock();
		storage.setItem("deciphraze_settings", JSON.stringify({
			pullToRefreshEnabled: false,
			hideInstructions: false,
			showAssociationHistory: false,
			showGameDayDate: true,
			textSize: 1.4,
			commandTextSize: 1.4,
		}));

		const repository = createSettingsRepository(storage);
		const settings = repository.getSettings();

		expect(settings.showGameDayDate).toBe(true);
	});

	it("should use default false for invalid showGameDayDate", () => {
		const storage = createLocalStorageMock();
		storage.setItem("deciphraze_settings", JSON.stringify({
			pullToRefreshEnabled: false,
			hideInstructions: false,
			showAssociationHistory: false,
			showGameDayDate: "not-a-boolean",
			textSize: 1.4,
			commandTextSize: 1.4,
		}));

		const repository = createSettingsRepository(storage);
		const settings = repository.getSettings();

		expect(settings.showGameDayDate).toBe(false);
	});
});
