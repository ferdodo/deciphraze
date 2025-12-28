import { DeciPlusMenu } from "@deciphraze/ds";
import { isDev } from "../utils/isDev";

interface PlusMenuComponentProps {
	onViewChange: (view: string | null) => void;
}

export function PlusMenuComponent({
	onViewChange,
}: PlusMenuComponentProps): JSX.Element {
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

	return (
		<DeciPlusMenu
			onParametersClick={handleParametersClick}
			onStatisticsClick={handleStatisticsClick}
			onYesterdayClick={handleYesterdayClick}
			onDevelopmentClick={handleDevelopmentClick}
			showDevelopmentPanelEntry={isDev()}
		/>
	);
}
