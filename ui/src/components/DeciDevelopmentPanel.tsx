import type React from "react";

interface DeciDevelopmentPanelProps {
	currentDay: string;
	onIncrementDay: () => void;
	onDecrementDay: () => void;
}

export function DeciDevelopmentPanel({
	currentDay,
	onIncrementDay,
	onDecrementDay,
}: DeciDevelopmentPanelProps): React.JSX.Element {
	return (
		<>
			<crumbs-p slot="title-4">Développement</crumbs-p>
			<crumbs-panel slot="content-4" panel-title="Développement" style={{ maxHeight: "calc(100vh - 14.5rem)"}}>
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
			</crumbs-panel>
		</>
	);
}

