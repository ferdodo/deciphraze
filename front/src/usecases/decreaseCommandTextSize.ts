import type { GameContext } from "@deciphraze/core";

export const decreaseCommandTextSize = (context: GameContext): void => {
	const { settingsRepository } = context;
	const currentSettings = settingsRepository.getSettings();
	
	settingsRepository.saveSettings({
		...currentSettings,
		commandTextSize: Math.max(0.5, currentSettings.commandTextSize - 0.1)
	});
};
