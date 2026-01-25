import type React from "react";
import { DeciText } from "./DeciText";

interface DeciYesterdaySolutionProps {
	paragraphOfYesterday: string;
}

export function DeciYesterdaySolution({ paragraphOfYesterday }: DeciYesterdaySolutionProps): React.JSX.Element {
	return (
		<div style={{ padding: "1rem" }}>
			<DeciText variant="muted">
				{paragraphOfYesterday}
			</DeciText>
		</div>
	);
}

