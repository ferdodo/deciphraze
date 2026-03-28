import type React from "react";
import { DeciText } from "./DeciText";

interface DeciYesterdaySolutionProps {
	paragraphOfYesterday: string;
	isPlayingPastGame: boolean;
}

export function DeciYesterdaySolution({ paragraphOfYesterday, isPlayingPastGame }: DeciYesterdaySolutionProps): React.JSX.Element {
	return (
		<div style={{ padding: "1rem" }}>
			<DeciText variant="muted">
				{isPlayingPastGame ? "La solution est cachée pendant que vous jouez cette partie" : paragraphOfYesterday}
			</DeciText>
		</div>
	);
}

