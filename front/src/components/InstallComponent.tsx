import type React from "react";
import { DeciInstallPanel, DeciPlusView } from "@deciphraze/ui";
import { useGameContext } from "../hooks/useGameContext";

interface InstallComponentProps {
	onBack: () => void;
}

export function InstallComponent({ onBack }: InstallComponentProps): React.JSX.Element {
	const { browserService } = useGameContext();
	const deviceType = browserService.getDevice();

	return (
		<DeciPlusView
			title="Installation"
			content={<DeciInstallPanel deviceType={deviceType} />}
			onBack={onBack}
		/>
	);
}

