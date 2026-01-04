import type React from "react";
import { useState, useEffect } from "react";
import { DeciSettingsPanel, DeciPlusView } from "@deciphraze/ui";
import { useGameContext } from "../hooks/useGameContext";

interface SettingsPanelComponentProps {
	onBack: () => void;
}

export function SettingsPanelComponent({ onBack }: SettingsPanelComponentProps): React.JSX.Element {
	const { browserService } = useGameContext();
	const [isPullToRefreshEnabled, setIsPullToRefreshEnabled] = useState<boolean>(() => 
		browserService.isPullToRefreshEnabled()
	);

	useEffect(() => {
		const unsubscribe = browserService.observePullToRefresh((enabled) => {
			setIsPullToRefreshEnabled(enabled);
		});
		return unsubscribe;
	}, [browserService]);

	const handleToggleFullscreen = (): void => {
		browserService.toggleFullscreen();
	};

	const handleTogglePullToRefresh = (): void => {
		browserService.togglePullToRefresh();
	};

	return (
		<DeciPlusView
			title="Paramètres"
			content={
				<DeciSettingsPanel 
					onToggleFullscreen={handleToggleFullscreen}
					onTogglePullToRefresh={handleTogglePullToRefresh}
					isPullToRefreshEnabled={isPullToRefreshEnabled}
				/>
			}
			onBack={onBack}
		/>
	);
}

