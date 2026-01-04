import type React from "react";
import { useState, useEffect } from "react";
import { DeciSettingsPanel, DeciPlusView } from "@deciphraze/ui";
import { useGameContext } from "../hooks/useGameContext";
import type { Settings } from "../entities/Settings";
import { resetAllData } from "../usecases/resetAllData";

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

	useEffect(() => {
		const subscription = settingsRepository.settings$.subscribe((settings: Settings) => {
			setIsPullToRefreshEnabled(settings.pullToRefreshEnabled);
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

	const handleResetData = (): void => {
		resetAllData(context);
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
				/>
			}
			onBack={onBack}
		/>
	);
}

