import type React from "react";

interface DeciSettingsPanelProps {
	onToggleFullscreen: () => void;
	onTogglePullToRefresh: () => void;
	isPullToRefreshEnabled: boolean;
	onResetData: () => void;
}

export function DeciSettingsPanel({ onToggleFullscreen, onTogglePullToRefresh, isPullToRefreshEnabled, onResetData }: DeciSettingsPanelProps): React.JSX.Element {

	return (
		<div style={{ padding: "1rem" }}>
			<crumbs-p>
				Paramètres
			</crumbs-p>
			<div style={{ marginTop: "2rem" }}>
				<crumbs-p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "1rem" }}>
					Affichage
				</crumbs-p>
				<crumbs-button
					title="Plein écran"
					onClick={onToggleFullscreen}
					role="button"
				>
					Plein écran
				</crumbs-button>
			</div>
			<div style={{ marginTop: "2rem" }}>
				<crumbs-p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "1rem" }}>
					Comportement
				</crumbs-p>
				<crumbs-p style={{ fontSize: "0.85rem", color: "#888", marginBottom: "0.75rem", lineHeight: "1.4" }}>
					Permet de rafraîchir la page en tirant vers le bas depuis le haut de l'écran.
				</crumbs-p>
				<crumbs-button
					title={isPullToRefreshEnabled ? "Désactiver le pull-to-refresh" : "Activer le pull-to-refresh"}
					onClick={onTogglePullToRefresh}
					role="button"
				>
					{isPullToRefreshEnabled ? "Pull-to-refresh activé" : "Pull-to-refresh désactivé"}
				</crumbs-button>
			</div>
			<div style={{ marginTop: "2rem" }}>
				<crumbs-p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "1rem" }}>
					Données
				</crumbs-p>
				<crumbs-p style={{ fontSize: "0.85rem", color: "#888", marginBottom: "0.75rem", lineHeight: "1.4" }}>
					Réinitialise toutes les données de l'application (historique, statistiques, succès, etc.).
				</crumbs-p>
				<crumbs-button
					title="Réinitialiser les données"
					onClick={onResetData}
					role="button"
				>
					Réinitialiser les données
				</crumbs-button>
			</div>
		</div>
	);
}

