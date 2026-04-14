import { BehaviorSubject } from "rxjs";
import { share } from "rxjs/operators";
import type { SettingsRepository } from "../repositories/SettingsRepository";
import type { Settings } from "../entities/Settings";
import type { StorageLike } from "./StorageLike";
import { getDefaultTextSize } from "./getDefaultTextSize";

const SETTINGS_STORAGE_KEY = "deciphraze_settings";

const defaultSettings: Settings = {
	pullToRefreshEnabled: false,
	hideInstructions: false,
	showAssociationHistory: false,
	showLetterAvailabilityForLettre: false,
	showGameDayDate: false,
	textSize: getDefaultTextSize(),
	commandTextSize: getDefaultTextSize(),
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
					hideInstructions: typeof parsed.hideInstructions === "boolean" 
						? parsed.hideInstructions 
						: defaultSettings.hideInstructions,
					showAssociationHistory: typeof parsed.showAssociationHistory === "boolean"
						? parsed.showAssociationHistory
						: defaultSettings.showAssociationHistory,
					showLetterAvailabilityForLettre: typeof parsed.showLetterAvailabilityForLettre === "boolean"
						? parsed.showLetterAvailabilityForLettre
						: defaultSettings.showLetterAvailabilityForLettre,
					showGameDayDate: typeof parsed.showGameDayDate === "boolean"
						? parsed.showGameDayDate
						: defaultSettings.showGameDayDate,
					textSize: typeof parsed.textSize === "number" 
						? parsed.textSize 
						: defaultSettings.textSize,
					commandTextSize: typeof parsed.commandTextSize === "number" 
						? parsed.commandTextSize 
						: defaultSettings.commandTextSize,
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

	return {
		getSettings,
		saveSettings,
		settings$: settingsSubject.asObservable().pipe(share()),
	};
}
