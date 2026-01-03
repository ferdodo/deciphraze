import React from "react";

type PwaSupportStatus = "supported" | "no-service-worker" | "no-window" | "no-navigator" | "no-https";

interface DeciSettingsPanelProps {
	isPwaInstallable: boolean;
	isInstalled: boolean;
	supportStatus: PwaSupportStatus;
	onInstallClick: () => void;
}

export function DeciSettingsPanel({ isPwaInstallable, isInstalled, supportStatus, onInstallClick }: DeciSettingsPanelProps): React.JSX.Element {
	let statusMessage: React.JSX.Element | null = null;

	if (isInstalled) {
		statusMessage = (
			<div style={{ marginBottom: "1rem" }}>
				<crumbs-p style={{ color: "#666", fontSize: "0.9rem" }}>
					L'application est déjà installée.
				</crumbs-p>
			</div>
		);
	} else if (isPwaInstallable) {
		statusMessage = (
			<div style={{ marginBottom: "1rem" }}>
				<crumbs-button
					title="Installer l'application"
					onClick={onInstallClick}
					role="button"
				>
					Installer l'application
				</crumbs-button>
			</div>
		);
	} else if (supportStatus === "supported") {
		statusMessage = (
			<div style={{ marginBottom: "1rem" }}>
				<crumbs-p style={{ color: "#666", fontSize: "0.9rem" }}>
					L'installation n'est pas disponible pour le moment. Vérifiez que vous utilisez HTTPS et que vous avez visité le site plusieurs fois.
				</crumbs-p>
			</div>
		);
	} else {
		let message = "L'installation n'est pas disponible.";
		if (supportStatus === "no-https") {
			message = "L'application fonctionne actuellement en HTTP (connexion non sécurisée). Pour des raisons de sécurité, les navigateurs n'autorisent pas l'installation d'applications dans ce contexte.";
		} else if (supportStatus === "no-service-worker") {
			message = "Les Service Workers ne sont pas disponibles dans votre navigateur. Cela peut être dû à un navigateur très ancien, au mode privé, ou à une extension qui les bloque.";
		} else if (supportStatus === "no-window") {
			message = "L'installation n'est pas disponible dans cet environnement.";
		} else if (supportStatus === "no-navigator") {
			message = "L'installation n'est pas disponible. Vérifiez que vous utilisez un navigateur web standard.";
		}
		statusMessage = (
			<div style={{ marginBottom: "1rem" }}>
				<crumbs-p style={{ color: "#666", fontSize: "0.9rem" }}>
					{message}
				</crumbs-p>
			</div>
		);
	}

	return (
		<div style={{ padding: "1rem" }}>
			{statusMessage}
			<crumbs-p>
				Paramètres
			</crumbs-p>
		</div>
	);
}

