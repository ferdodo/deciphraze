import { DeciPlusMenu } from "@deciphraze/ds";
import { isDev } from "../utils/isDev";
import type { PlusView } from "../types/PlusView";

interface PlusMenuComponentProps {
	onViewChange: (view: PlusView) => void;
}

import React from "react";

export function PlusMenuComponent({
	onViewChange,
}: PlusMenuComponentProps): React.JSX.Element {
	const handleParametersClick = (): void => {
		onViewChange("settings");
	};

	const handleStatisticsClick = (): void => {
		onViewChange("statistics");
	};

	const handleYesterdayClick = (): void => {
		onViewChange("yesterday");
	};

	const handleDevelopmentClick = (): void => {
		onViewChange("development");
	};

	const handleInstallClick = (): void => {
		onViewChange("install");
	};

	return (
		<DeciPlusMenu
			onParametersClick={handleParametersClick}
			onStatisticsClick={handleStatisticsClick}
			onYesterdayClick={handleYesterdayClick}
			onDevelopmentClick={handleDevelopmentClick}
			onInstallClick={handleInstallClick}
			showDevelopmentPanelEntry={isDev()}
		/>
	);
}
