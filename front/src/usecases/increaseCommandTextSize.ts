import type { GameContext } from "@deciphraze/core";

export const increaseCommandTextSize = (context: GameContext): void => {
	const { settingsRepository } = context;
	const currentSettings = settingsRepository.getSettings();
	
	settingsRepository.saveSettings({
		...currentSettings,
		commandTextSize: Math.min(2.5, currentSettings.commandTextSize + 0.1)
	});
};
