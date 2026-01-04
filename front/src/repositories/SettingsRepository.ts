import type { Observable } from "rxjs";
import type { Settings } from "../entities/Settings";

export interface SettingsRepository {
	getSettings(): Settings;
	saveSettings(settings: Settings): void;
	settings$: Observable<Settings>;
	clear(): void;
}

