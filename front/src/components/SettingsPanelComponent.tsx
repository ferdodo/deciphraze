import type React from "react";
import { DeciSettingsPanel, DeciPlusView } from "@deciphraze/ds";

interface SettingsPanelComponentProps {
	onBack: () => void;
}

export function SettingsPanelComponent({ onBack }: SettingsPanelComponentProps): React.JSX.Element {
	return (
		<DeciPlusView
			title="Paramètres"
			content={<DeciSettingsPanel />}
			onBack={onBack}
		/>
	);
}

