import type React from "react";
import { DeciInstallPanel, DeciPlusView } from "@deciphraze/ui";
import { usePwaInstallable } from "../hooks/usePwaInstallable";
import { useGameContext } from "../hooks/useGameContext";

interface InstallComponentProps {
	onBack: () => void;
}

export function InstallComponent({ onBack }: InstallComponentProps): React.JSX.Element {
	const { browserService } = useGameContext();
	const isPwaInstallable = usePwaInstallable();
	const isInstalled = browserService.isInstalled();
	const supportStatus = browserService.getSupportStatus();

	const handleInstallClick = (): void => {
		browserService.installPwa();
	};

	return (
		<DeciPlusView
			title="Installation"
			content={<DeciInstallPanel isPwaInstallable={isPwaInstallable} isInstalled={isInstalled} supportStatus={supportStatus} onInstallClick={handleInstallClick} />}
			onBack={onBack}
		/>
	);
}

