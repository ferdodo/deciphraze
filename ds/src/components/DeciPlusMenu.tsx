import React from "react";

interface DeciPlusMenuProps {
	onParametersClick: () => void;
	onStatisticsClick: () => void;
	onYesterdayClick: () => void;
	onDevelopmentClick: () => void;
	onInstallClick: () => void;
	showDevelopmentPanelEntry: boolean;
}

export function DeciPlusMenu({
	onParametersClick,
	onStatisticsClick,
	onYesterdayClick,
	onDevelopmentClick,
	onInstallClick,
	showDevelopmentPanelEntry,
}: DeciPlusMenuProps): React.JSX.Element {
	return (
		<crumbs-panel panel-title="Plus">
			<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
				<crumbs-button
					title="Installation"
					onClick={onInstallClick}
					role="button"
				>
					Installation
				</crumbs-button>
				<crumbs-button
					title="Paramètres"
					onClick={onParametersClick}
					role="button"
				>
					Paramètres
				</crumbs-button>
				<crumbs-button
					title="Statistiques"
					onClick={onStatisticsClick}
					role="button"
				>
					Statistiques
				</crumbs-button>
				<crumbs-button
					title="Solution d'hier"
					onClick={onYesterdayClick}
					role="button"
				>
					Solution d'hier
				</crumbs-button>
				{showDevelopmentPanelEntry && (
					<crumbs-button
						title="Panel développeur"
						onClick={onDevelopmentClick}
						role="button"
					>
						Panel développeur
					</crumbs-button>
				)}
			</div>
		</crumbs-panel>
	);
}

