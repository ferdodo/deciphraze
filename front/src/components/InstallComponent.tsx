import React from "react";
import { DeciInstallPanel, DeciPlusView } from "@deciphraze/ds";
import { usePwaInstallable } from "../hooks/usePwaInstallable";
import { useGameContext } from "../hooks/useGameContext";

interface InstallComponentProps {
	onBack: () => void;
}

export function InstallComponent({ onBack }: InstallComponentProps): React.JSX.Element {
	const { pwaService } = useGameContext();
	const isPwaInstallable = usePwaInstallable();
	const isInstalled = pwaService.isInstalled();
	const supportStatus = pwaService.getSupportStatus();

	const handleInstallClick = (): void => {
		pwaService.installPwa();
	};

	return (
		<DeciPlusView
			title="Installation"
			content={<DeciInstallPanel isPwaInstallable={isPwaInstallable} isInstalled={isInstalled} supportStatus={supportStatus} onInstallClick={handleInstallClick} />}
			onBack={onBack}
		/>
	);
}

