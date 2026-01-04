import type React from "react";

interface DeciSettingsPanelProps {
	onToggleFullscreen: () => void;
}

export function DeciSettingsPanel({ onToggleFullscreen }: DeciSettingsPanelProps): React.JSX.Element {

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
		</div>
	);
}

