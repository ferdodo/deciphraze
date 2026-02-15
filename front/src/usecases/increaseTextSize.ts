import type { GameContext } from "../contexts/GameContext";

export const increaseTextSize = (context: GameContext): void => {
	const { settingsRepository } = context;
	const currentSettings = settingsRepository.getSettings();
	
	settingsRepository.saveSettings({
		...currentSettings,
		textSize: currentSettings.textSize + 0.1
	});
};
