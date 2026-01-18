import { describe, it, expect } from "vitest";
import { createSettingsRepository } from "./createSettingsRepository";
import type { Settings } from "../entities/Settings";
import { createLocalStorageMock } from "./createLocalStorageMock";

describe("createSettingsRepository", () => {
	it("should use default settings when localStorage is empty", () => {
		const storage = createLocalStorageMock();
		const repository = createSettingsRepository(storage);
		const settings = repository.getSettings();

		expect(settings.pullToRefreshEnabled).toBe(true);
		expect(settings.hideInstructions).toBe(false);
	});

	it("should load valid settings from localStorage", () => {
		const storage = createLocalStorageMock();
		const validSettings: Settings = {
			pullToRefreshEnabled: false,
			hideInstructions: true,
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

		expect(settings.pullToRefreshEnabled).toBe(true); // Default value
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

	it("should save and retrieve settings", () => {
		const storage = createLocalStorageMock();
		const repository = createSettingsRepository(storage);
		const newSettings: Settings = {
			pullToRefreshEnabled: false,
			hideInstructions: true,
		};

		repository.saveSettings(newSettings);
		const savedSettings = repository.getSettings();

		expect(savedSettings.pullToRefreshEnabled).toBe(false);
		expect(savedSettings.hideInstructions).toBe(true);

		// Verify it's persisted in storage
		const stored = storage.getItem("deciphraze_settings");
		expect(stored).toBeTruthy();
		if (stored) {
			const parsed = JSON.parse(stored);
			expect(parsed.pullToRefreshEnabled).toBe(false);
			expect(parsed.hideInstructions).toBe(true);
		}
	});

	it("should emit settings changes through settings$ observable", async () => {
		const storage = createLocalStorageMock();
		const repository = createSettingsRepository(storage);
		const receivedSettings: Settings[] = [];

		await new Promise<void>((resolve) => {
			const subscription = repository.settings$.subscribe((settings: Settings) => {
				receivedSettings.push({ ...settings });
				if (receivedSettings.length === 2) {
					expect(receivedSettings[0].pullToRefreshEnabled).toBe(true);
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
			});
		});
	});

	it("should clear settings and reset to defaults", () => {
		const storage = createLocalStorageMock();
		const repository = createSettingsRepository(storage);

		// Set custom settings
		repository.saveSettings({
			pullToRefreshEnabled: false,
			hideInstructions: true,
		});

		// Clear settings
		repository.clear();
		const settings = repository.getSettings();

		expect(settings.pullToRefreshEnabled).toBe(true); // Default
		expect(settings.hideInstructions).toBe(false); // Default
		expect(storage.getItem("deciphraze_settings")).toBeNull();
	});

	it("should handle non-object parsed data", () => {
		const storage = createLocalStorageMock();
		storage.setItem("deciphraze_settings", '"just a string"');

		const repository = createSettingsRepository(storage);
		const settings = repository.getSettings();

		expect(settings.pullToRefreshEnabled).toBe(true);
		expect(settings.hideInstructions).toBe(false);
	});
});

