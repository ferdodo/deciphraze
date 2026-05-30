import type { GameContext } from "@deciphraze/core";

export const decreaseTextSize = (context: GameContext): void => {
	const { settingsRepository } = context;
	const currentSettings = settingsRepository.getSettings();
	
	settingsRepository.saveSettings({
		...currentSettings,
		textSize: Math.max(0.5, currentSettings.textSize - 0.1)
	});
};
