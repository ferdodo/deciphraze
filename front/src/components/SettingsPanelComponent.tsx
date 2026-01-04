import type React from "react";
import { DeciSettingsPanel, DeciPlusView } from "@deciphraze/ui";
import { useGameContext } from "../hooks/useGameContext";

interface SettingsPanelComponentProps {
	onBack: () => void;
}

export function SettingsPanelComponent({ onBack }: SettingsPanelComponentProps): React.JSX.Element {
	const { browserService } = useGameContext();

	const handleToggleFullscreen = (): void => {
		browserService.toggleFullscreen();
	};

	return (
		<DeciPlusView
			title="Paramètres"
			content={<DeciSettingsPanel onToggleFullscreen={handleToggleFullscreen} />}
			onBack={onBack}
		/>
	);
}

