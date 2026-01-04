import { BehaviorSubject } from "rxjs";
import { share } from "rxjs/operators";
import type { SettingsRepository } from "../repositories/SettingsRepository";
import type { Settings } from "../entities/Settings";
import type { StorageLike } from "./StorageLike";

const SETTINGS_STORAGE_KEY = "deciphraze_settings";

const defaultSettings: Settings = {
	pullToRefreshEnabled: true,
};

export function createSettingsRepository(storage: StorageLike): SettingsRepository {
	let settings: Settings;

	try {
		const stored: string = storage.getItem(SETTINGS_STORAGE_KEY) ?? "";
		if (stored === "" || stored === "null") {
			settings = defaultSettings;
		} else {
			const parsed = JSON.parse(stored);
			// Validation basique
			if (parsed && typeof parsed === "object") {
				settings = {
					pullToRefreshEnabled: typeof parsed.pullToRefreshEnabled === "boolean" 
						? parsed.pullToRefreshEnabled 
						: defaultSettings.pullToRefreshEnabled,
				};
			} else {
				settings = defaultSettings;
			}
		}
	} catch (_error) {
		settings = defaultSettings;
	}

	const settingsSubject = new BehaviorSubject<Settings>({ ...settings });

	function getSettings(): Settings {
		return { ...settings };
	}

	function saveSettings(newSettings: Settings): void {
		settings = { ...newSettings };
		storage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
		settingsSubject.next({ ...settings });
	}

	function clear(): void {
		settings = defaultSettings;
		storage.removeItem(SETTINGS_STORAGE_KEY);
		settingsSubject.next({ ...settings });
	}

	return {
		getSettings,
		saveSettings,
		settings$: settingsSubject.asObservable().pipe(share()),
		clear
	};
}

