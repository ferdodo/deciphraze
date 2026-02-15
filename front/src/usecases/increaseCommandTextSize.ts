import type { GameContext } from "../contexts/GameContext";

export const increaseCommandTextSize = (context: GameContext): void => {
	const { settingsRepository } = context;
	const currentSettings = settingsRepository.getSettings();
	
	settingsRepository.saveSettings({
		...currentSettings,
		commandTextSize: currentSettings.commandTextSize + 0.1
	});
};
