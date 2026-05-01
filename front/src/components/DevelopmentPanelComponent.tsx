import type React from "react";
import { DeciDevelopmentPanelContent, DeciPlusView } from "@deciphraze/ui";
import { useCurrentDay } from "../hooks/useCurrentDay";
import { useGameContext } from "../hooks/useGameContext";
import { isDev } from "../utils/isDev";
import { incrementDay } from "../usecases/incrementDay";
import { decrementDay } from "../usecases/decrementDay";

interface DevelopmentPanelComponentProps {
	onBack: () => void;
}

export function DevelopmentPanelComponent({ onBack }: DevelopmentPanelComponentProps): React.JSX.Element | null {
	const context = useGameContext();
	const currentDay = useCurrentDay();

	const handleIncrementDay = (): void => {
		incrementDay(context);
	};

	const handleDecrementDay = (): void => {
		decrementDay(context);
	};

	const handleAddPlatinum = (): void => {
		const achievements = context.achievementRepository.loadAchievements();
		Object.values(achievements.achievements).forEach((achievement) => {
			achievement.unlocked = true;
		});
		context.achievementRepository.saveAchievements(achievements);
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
					onAddPlatinum={handleAddPlatinum}
				/>
			}
			onBack={onBack}
		/>
	);
};
