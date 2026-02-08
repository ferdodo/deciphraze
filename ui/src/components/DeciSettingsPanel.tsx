import type React from "react";
import { DeciText } from "./DeciText";

interface DeciSettingsPanelProps {
	onToggleFullscreen: () => void;
	onTogglePullToRefresh: () => void;
	isPullToRefreshEnabled: boolean;
	onResetData: () => void;
	onToggleHideInstructions: () => void;
	isHideInstructionsEnabled: boolean;
}

export function DeciSettingsPanel({ onToggleFullscreen, onTogglePullToRefresh, isPullToRefreshEnabled, onResetData, onToggleHideInstructions, isHideInstructionsEnabled }: DeciSettingsPanelProps): React.JSX.Element {

	return (
		<div style={{ padding: "1rem" }}>
			<div style={{ marginTop: "2rem" }}>
				<DeciText variant="sectionTitle">
					Affichage
				</DeciText>
				<crumbs-button
					title="Plein écran"
					onClick={onToggleFullscreen}
					role="button"
				>
					<DeciText variant="command">Plein écran</DeciText>
				</crumbs-button>
			</div>
			<div style={{ marginTop: "2rem" }}>
				<DeciText variant="sectionTitle">
					Comportement
				</DeciText>
				<DeciText variant="muted">
					Permet de rafraîchir la page en tirant vers le bas depuis le haut de l'écran.
				</DeciText>
				<crumbs-button
					title={isPullToRefreshEnabled ? "Désactiver le pull-to-refresh" : "Activer le pull-to-refresh"}
					onClick={onTogglePullToRefresh}
					role="button"
				>
					<DeciText variant="command">
						{isPullToRefreshEnabled ? "Pull-to-refresh activé" : "Pull-to-refresh désactivé"}
					</DeciText>
				</crumbs-button>
			</div>
			<div style={{ marginTop: "2rem" }}>
				<DeciText variant="sectionTitle">
					Jeu
				</DeciText>
				<DeciText variant="muted">
					Cache les instructions du jeu.
				</DeciText>
				<crumbs-button
					title={isHideInstructionsEnabled ? "Afficher les instructions" : "Cacher les instructions"}
					onClick={onToggleHideInstructions}
					role="button"
				>
					<DeciText variant="command">
						{isHideInstructionsEnabled ? "Instructions cachées" : "Instructions visibles"}
					</DeciText>
				</crumbs-button>
			</div>
			<div style={{ marginTop: "2rem" }}>
				<DeciText variant="sectionTitle">
					Données
				</DeciText>
				<DeciText variant="muted">
					Réinitialise toutes les données de l'application (historique, statistiques, succès, etc.).
				</DeciText>
				<crumbs-button
					title="Réinitialiser les données"
					onClick={onResetData}
					role="button"
				>
					<DeciText variant="command">Réinitialiser les données</DeciText>
				</crumbs-button>
			</div>
		</div>
	);
}

