import { DeciDevelopmentPanel } from "@deciphraze/ds";
import { useDay } from "../hooks/useDay";
import { useGameContext } from "../hooks/useGameContext";
import { isDev } from "../utils/isDev";
import { incrementDay } from "../usecases/incrementDay";
import { decrementDay } from "../usecases/decrementDay";

export function DevelopmentPanelComponent(): JSX.Element | null {
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
		<DeciDevelopmentPanel
			currentDay={currentDay}
			onIncrementDay={handleIncrementDay}
			onDecrementDay={handleDecrementDay}
		/>
	);
};

