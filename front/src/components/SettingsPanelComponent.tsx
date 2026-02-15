import type React from "react";
import { useState, useEffect } from "react";
import { DeciSettingsPanel, DeciPlusView } from "@deciphraze/ui";
import { useGameContext } from "../hooks/useGameContext";
import type { Settings } from "../entities/Settings";
import { resetAllData } from "../usecases/resetAllData";
import { increaseTextSize } from "../usecases/increaseTextSize";
import { decreaseTextSize } from "../usecases/decreaseTextSize";
import { increaseCommandTextSize } from "../usecases/increaseCommandTextSize";
import { decreaseCommandTextSize } from "../usecases/decreaseCommandTextSize";

interface SettingsPanelComponentProps {
	onBack: () => void;
}

export function SettingsPanelComponent({ onBack }: SettingsPanelComponentProps): React.JSX.Element {
	const context = useGameContext();
	const { 
		browserService,
		settingsRepository,
	} = context;
	const [isPullToRefreshEnabled, setIsPullToRefreshEnabled] = useState<boolean>(() => 
		settingsRepository.getSettings().pullToRefreshEnabled
	);
	const [hideInstructions, setHideInstructions] = useState<boolean>(() => 
		settingsRepository.getSettings().hideInstructions
	);
	const [textSize, setTextSize] = useState<number>(() => 
		settingsRepository.getSettings().textSize
	);
	const [commandTextSize, setCommandTextSize] = useState<number>(() => 
		settingsRepository.getSettings().commandTextSize
	);

	useEffect(() => {
		const subscription = settingsRepository.settings$.subscribe((settings: Settings) => {
			setIsPullToRefreshEnabled(settings.pullToRefreshEnabled);
			setHideInstructions(settings.hideInstructions);
			setTextSize(settings.textSize);
			setCommandTextSize(settings.commandTextSize);
		});
		return () => subscription.unsubscribe();
	}, [settingsRepository]);

	const handleToggleFullscreen = (): void => {
		browserService.toggleFullscreen();
	};

	const handleTogglePullToRefresh = (): void => {
		const currentSettings = settingsRepository.getSettings();
		settingsRepository.saveSettings({
			...currentSettings,
			pullToRefreshEnabled: !currentSettings.pullToRefreshEnabled
		});
	};

	const handleToggleHideInstructions = (): void => {
		const currentSettings = settingsRepository.getSettings();
		settingsRepository.saveSettings({
			...currentSettings,
			hideInstructions: !currentSettings.hideInstructions
		});
	};

	const handleResetData = (): void => {
		resetAllData(context);
	};

	const handleIncreaseTextSize = (): void => {
		increaseTextSize(context);
	};

	const handleDecreaseTextSize = (): void => {
		decreaseTextSize(context);
	};

	const handleIncreaseCommandTextSize = (): void => {
		increaseCommandTextSize(context);
	};

	const handleDecreaseCommandTextSize = (): void => {
		decreaseCommandTextSize(context);
	};

	return (
		<DeciPlusView
			title="Paramètres"
			content={
				<DeciSettingsPanel 
					onToggleFullscreen={handleToggleFullscreen}
					onTogglePullToRefresh={handleTogglePullToRefresh}
					isPullToRefreshEnabled={isPullToRefreshEnabled}
					onResetData={handleResetData}
					onToggleHideInstructions={handleToggleHideInstructions}
					isHideInstructionsEnabled={hideInstructions}
					textSize={textSize}
					onIncreaseTextSize={handleIncreaseTextSize}
					onDecreaseTextSize={handleDecreaseTextSize}
					commandTextSize={commandTextSize}
					onIncreaseCommandTextSize={handleIncreaseCommandTextSize}
					onDecreaseCommandTextSize={handleDecreaseCommandTextSize}
				/>
			}
			onBack={onBack}
		/>
	);
}

