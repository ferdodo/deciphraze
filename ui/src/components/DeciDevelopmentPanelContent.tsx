import type React from "react";

interface DeciDevelopmentPanelContentProps {
	currentDay: string;
	onIncrementDay: () => void;
	onDecrementDay: () => void;
}

export function DeciDevelopmentPanelContent({
	currentDay,
	onIncrementDay,
	onDecrementDay,
}: DeciDevelopmentPanelContentProps): React.JSX.Element {
	return (
		<div style={{ padding: "1rem" }}>
			<crumbs-p>
				Date actuelle : {currentDay}
			</crumbs-p>
			<br />
			<div style={{ display: "flex", gap: "1rem" }}>
				<crumbs-button
					title="Jour précédent"
					onClick={onDecrementDay}
					role="button"
				>
					← Jour précédent
				</crumbs-button>
				<crumbs-button
					title="Jour suivant"
					onClick={onIncrementDay}
					role="button"
				>
					Jour suivant →
				</crumbs-button>
			</div>
		</div>
	);
}

