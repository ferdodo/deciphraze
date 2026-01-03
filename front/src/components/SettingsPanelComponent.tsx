import React from "react";
import { DeciSettingsPanel, DeciPlusView } from "@deciphraze/ds";
import { usePwaInstallable } from "../hooks/usePwaInstallable";
import { useGameContext } from "../hooks/useGameContext";

interface SettingsPanelComponentProps {
	onBack: () => void;
}

export function SettingsPanelComponent({ onBack }: SettingsPanelComponentProps): React.JSX.Element {
	const { pwaService } = useGameContext();
	const isPwaInstallable = usePwaInstallable();
	const isInstalled = pwaService.isInstalled();
	const supportStatus = pwaService.getSupportStatus();

	const handleInstallClick = (): void => {
		pwaService.installPwa();
	};

	return (
		<DeciPlusView
			title="Paramètres"
			content={<DeciSettingsPanel isPwaInstallable={isPwaInstallable} isInstalled={isInstalled} supportStatus={supportStatus} onInstallClick={handleInstallClick} />}
			onBack={onBack}
		/>
	);
}

