import type React from "react";
import { useState } from "react";
import { DeciDevelopmentPanelContent, DeciPlusView } from "@deciphraze/ui";
import { useCurrentDay } from "../hooks/useCurrentDay";
import { useGameContext } from "../hooks/useGameContext";
import { isDev } from "../utils/isDev";
import { incrementDay } from "../usecases/incrementDay";
import { decrementDay } from "../usecases/decrementDay";
import { encodeChallengeCode } from "@deciphraze/core";

interface DevelopmentPanelComponentProps {
	onBack: () => void;
}

export function DevelopmentPanelComponent({ onBack }: DevelopmentPanelComponentProps): React.JSX.Element | null {
	const context = useGameContext();
	const currentDay = useCurrentDay();
	const [generatedCode, setGeneratedCode] = useState<string | undefined>();
	const [codeLevel, setCodeLevel] = useState("1");
	const [codeDay, setCodeDay] = useState(currentDay);

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

	const handleGenerateCode = (): void => {
		const challenge = context.challengeRepository.getChallenge();
		const code = encodeChallengeCode(challenge.id, codeDay, parseInt(codeLevel, 10), context.randomService);
		setGeneratedCode(code);
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
					codeLevel={codeLevel}
					onCodeLevelChange={setCodeLevel}
					codeDay={codeDay}
					onCodeDayChange={setCodeDay}
					onGenerateCode={handleGenerateCode}
					generatedCode={generatedCode}
				/>
			}
			onBack={onBack}
		/>
	);
};
