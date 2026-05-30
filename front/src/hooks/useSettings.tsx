import { useState, useEffect, useContext } from "react";
import type { Settings } from "@deciphraze/core";
import { gameContext } from "../contexts/gameContext";

export function useSettings(): Settings {
	const context = useContext(gameContext);
	if (context === undefined) {
		throw new Error("useSettings must be used within a GameContextProvider");
	}

	const { settingsRepository } = context;
	const [settings, setSettings] = useState<Settings>(() =>
		settingsRepository.getSettings()
	);

	useEffect(() => {
		const subscription = settingsRepository.settings$.subscribe((newSettings: Settings) => {
			setSettings(newSettings);
		});

		return () => subscription.unsubscribe();
	}, [settingsRepository]);

	return settings;
}
