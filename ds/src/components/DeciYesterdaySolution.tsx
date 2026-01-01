import React from "react";

interface DeciYesterdaySolutionProps {
	paragraphOfYesterday: string;
}

export function DeciYesterdaySolution({ paragraphOfYesterday }: DeciYesterdaySolutionProps): React.JSX.Element {
	return (
		<div style={{ padding: "1rem" }}>
			<crumbs-p>{paragraphOfYesterday}</crumbs-p>
		</div>
	);
}

