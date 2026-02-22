import type React from "react";
import { DeciText } from "./DeciText";

type DeviceType = "ios-safari" | "android-chrome" | "android-firefox" | "android-edge" | "desktop-chrome" | "desktop-firefox" | "desktop-edge" | "desktop-safari" | "unknown";

interface DeciInstallPanelProps {
	deviceType: DeviceType;
}

export function DeciInstallPanel({ deviceType }: DeciInstallPanelProps): React.JSX.Element {
	const getInstallInstructions = (): React.JSX.Element => {
		switch (deviceType) {
			case "ios-safari":
				return (
					<div>
						<DeciText variant="muted">
							Pour installer l'application sur iOS:<br/>
							1. Tapez sur l'icône Partager (📤)<br/>
							2. Tapez sur "Sur l'écran d'accueil"<br/>
							3. Confirmez l'installation
						</DeciText>
					</div>
				);
				
			case "android-chrome":
				return (
					<div>
						<DeciText variant="muted">
							Pour installer l'application sur Android Chrome:<br/>
							1. Tapez sur le menu (⋮)<br/>
							2. Tapez sur "Ajouter à l'écran d'accueil"<br/>
							3. Confirmez l'installation
						</DeciText>
					</div>
				);
				
			case "android-firefox":
				return (
					<div>
						<DeciText variant="muted">
							Pour installer l'application sur Android Firefox:<br/>
							1. Tapez sur le menu (⋮)<br/>
							2. Tapez sur "Page" → "Ajouter à l'écran d'accueil"<br/>
							3. Confirmez l'installation
						</DeciText>
					</div>
				);
				
			case "android-edge":
				return (
					<div>
						<DeciText variant="muted">
							Pour installer l'application sur Android Edge:<br/>
							1. Tapez sur le menu (⋯)<br/>
							2. Tapez sur "Ajouter à l'écran d'accueil"<br/>
							3. Confirmez l'installation
						</DeciText>
					</div>
				);
				
			case "desktop-chrome":
			case "desktop-firefox":
			case "desktop-edge":
			case "desktop-safari":
				return (
					<div>
						<DeciText variant="muted">
							L'installation de l'application est disponible uniquement sur mobile.<br/><br/>
							Sur mobile, utilisez les options de votre navigateur pour ajouter ce site à votre écran d'accueil.
						</DeciText>
					</div>
				);
				
			default:
				return (
					<div>
						<DeciText variant="muted">
							Pour installer l'application:<br/>
							Utilisez les options de votre navigateur pour ajouter ce site à votre écran d'accueil.
						</DeciText>
					</div>
				);
		}
	};

	return (
		<div style={{ padding: "1rem" }}>
			<DeciText variant="default">
				Une fois installée, l'application pourra s'utiliser sans connexion internet.
			</DeciText>
			<div style={{ marginTop: "1rem" }}>
				<DeciText variant="default">
					Les étapes peuvent différer en fonction du modèle de votre téléphone et du lanceur d'application utilisé.
				</DeciText>
			</div>
			<div style={{ marginTop: "1rem" }}>
				{getInstallInstructions()}
			</div>
		</div>
	);
}

