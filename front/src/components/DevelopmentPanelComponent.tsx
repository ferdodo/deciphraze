import type React from "react";
import { DeciDevelopmentPanelContent, DeciPlusView } from "@deciphraze/ds";
import { useDay } from "../hooks/useDay";
import { useGameContext } from "../hooks/useGameContext";
import { isDev } from "../utils/isDev";
import { incrementDay } from "../usecases/incrementDay";
import { decrementDay } from "../usecases/decrementDay";

interface DevelopmentPanelComponentProps {
	onBack: () => void;
}

export function DevelopmentPanelComponent({ onBack }: DevelopmentPanelComponentProps): React.JSX.Element | null {
	const context = useGameContext();
	const currentDay = useDay();

	const handleIncrementDay = (): void => {
		incrementDay(context);
	};

	const handleDecrementDay = (): void => {
		decrementDay(context);
	};

	if (!isDev()) {
		return null;
	}

	return (
		<DeciPlusView
			title="Panel développeur"
			content={
				<DeciDevelopmentPanelContent
					currentDay={currentDay}
					onIncrementDay={handleIncrementDay}
					onDecrementDay={handleDecrementDay}
				/>
			}
			onBack={onBack}
		/>
	);
};

