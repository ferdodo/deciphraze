import type { GameContext } from "@deciphraze/core";

export const increaseTextSize = (context: GameContext): void => {
	const { settingsRepository } = context;
	const currentSettings = settingsRepository.getSettings();
	
	settingsRepository.saveSettings({
		...currentSettings,
		textSize: Math.min(2.5, currentSettings.textSize + 0.1)
	});
};
