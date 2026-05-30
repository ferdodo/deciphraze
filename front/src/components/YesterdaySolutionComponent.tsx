import type React from "react";
import { DeciYesterdaySolution, DeciPlusView } from "@deciphraze/ui";
import { useParagraphOfYesterday } from "../hooks/useParagraphOfYesterday";
import { useIsTodayGame } from "../hooks/useIsTodayGame";

interface YesterdaySolutionComponentProps {
	onBack: () => void;
}

export function YesterdaySolutionComponent({ onBack }: YesterdaySolutionComponentProps): React.JSX.Element {
	const paragraphOfYesterday = useParagraphOfYesterday();
	const isTodayGame = useIsTodayGame();
	
	return (
		<DeciPlusView
			title="Solution d'hier"
			content={<DeciYesterdaySolution paragraphOfYesterday={paragraphOfYesterday} isPlayingPastGame={!isTodayGame} />}
			onBack={onBack}
		/>
	);
}

