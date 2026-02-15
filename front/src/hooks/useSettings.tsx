import { useState, useEffect } from "react";
import type { Settings } from "../entities/Settings";
import type { SettingsRepository } from "../repositories/SettingsRepository";

export function useSettings(settingsRepository: SettingsRepository): Settings {
	const [settings, setSettings] = useState<Settings>(() =>
		settingsRepository.getSettings()
	);

	useEffect(() => {
		const subscription = settingsRepository.settings$.subscribe((newSettings) => {
			setSettings(newSettings);
		});

		return () => subscription.unsubscribe();
	}, [settingsRepository]);

	return settings;
}
