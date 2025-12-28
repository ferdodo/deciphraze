import { DeciSettingsPanel, DeciPlusView } from "@deciphraze/ds";

interface SettingsPanelComponentProps {
	onBack: () => void;
}

export function SettingsPanelComponent({ onBack }: SettingsPanelComponentProps): JSX.Element {
	return (
		<DeciPlusView
			title="Paramètres"
			content={<DeciSettingsPanel />}
			onBack={onBack}
		/>
	);
}

