interface DeciPlusMenuProps {
	onParametersClick: () => void;
	onStatisticsClick: () => void;
	onYesterdayClick: () => void;
	onDevelopmentClick: () => void;
	showDevelopmentPanelEntry: boolean;
}

export function DeciPlusMenu({
	onParametersClick,
	onStatisticsClick,
	onYesterdayClick,
	onDevelopmentClick,
	showDevelopmentPanelEntry,
}: DeciPlusMenuProps): JSX.Element {
	return (
		<div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
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
	);
}

