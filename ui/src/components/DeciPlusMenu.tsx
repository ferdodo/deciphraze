import type React from "react";
import { DeciText } from "./DeciText";

interface DeciPlusMenuProps {
	onParametersClick: () => void;
	onStatisticsClick: () => void;
	onYesterdayClick: () => void;
	onDevelopmentClick: () => void;
	onInstallClick: () => void;
	onAboutClick: () => void;
	onChallengeClick: () => void;
	showDevelopmentPanelEntry: boolean;
}

export function DeciPlusMenu({
	onParametersClick,
	onStatisticsClick,
	onYesterdayClick,
	onDevelopmentClick,
	onInstallClick,
	onAboutClick,
	onChallengeClick,
	showDevelopmentPanelEntry,
}: DeciPlusMenuProps): React.JSX.Element {
	return (
		<crumbs-panel>
			<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
				<crumbs-button
					title="Installation"
					onClick={onInstallClick}
					role="button"
				>
					<DeciText variant="command">Installation</DeciText>
				</crumbs-button>
				<crumbs-button
					title="Paramètres"
					onClick={onParametersClick}
					role="button"
				>
					<DeciText variant="command">Paramètres</DeciText>
				</crumbs-button>
				<crumbs-button
					title="Statistiques"
					onClick={onStatisticsClick}
					role="button"
				>
					<DeciText variant="command">Statistiques</DeciText>
				</crumbs-button>
				<crumbs-button
					title="Solution d'hier"
					onClick={onYesterdayClick}
					role="button"
				>
					<DeciText variant="command">Solution d'hier</DeciText>
				</crumbs-button>
				<crumbs-button
					title="Challenge"
					onClick={onChallengeClick}
					role="button"
				>
					<DeciText variant="command">Challenge 🏆</DeciText>
				</crumbs-button>
				<crumbs-button
					title="À propos"
					onClick={onAboutClick}
					role="button"
				>
					<DeciText variant="command">À propos</DeciText>
				</crumbs-button>
				{showDevelopmentPanelEntry && (
					<crumbs-button
						title="Panel développeur"
						onClick={onDevelopmentClick}
						role="button"
					>
						<DeciText variant="command">Panel développeur</DeciText>
					</crumbs-button>
				)}
			</div>
		</crumbs-panel>
	);
}

