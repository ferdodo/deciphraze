import type React from "react";
import { DeciPlusView, DeciText } from "@deciphraze/ui";

interface AboutComponentProps {
	onBack: () => void;
}

export function AboutComponent({ onBack }: AboutComponentProps): React.JSX.Element {
	return (
		<DeciPlusView
			title="À propos"
			content={
				<div style={{ padding: "1rem" }}>



					<div style={{ marginBottom: "2rem" }}>
						<DeciText variant="sectionTitle">
							Bugs & Support
						</DeciText>
						<DeciText variant="muted">
							• <a href="https://github.com/ferdodo/deciphraze/issues" target="_blank" rel="noopener noreferrer">Signaler un problème</a>
						</DeciText>
					</div>

					<div style={{ marginBottom: "2rem" }}>
						<DeciText variant="sectionTitle">
							Données personnelles
						</DeciText>
						<DeciText variant="muted">
							• Vos données de jeu sont stockées localement sur votre appareil
						</DeciText>
						<DeciText variant="muted">
							• Aucune donnée personnelle n'est collectée
						</DeciText>
						<DeciText variant="muted">
							• Vous pouvez supprimer toutes vos données à tout moment dans les paramètres
						</DeciText>
					</div>

					<div style={{ marginBottom: "2rem" }}>
						<DeciText variant="sectionTitle">
							Mentions légales
						</DeciText>
						<DeciText variant="muted">
							• Éditeur : ferdodo
						</DeciText>
						<DeciText variant="muted">
							• <a href="https://github.com/ferdodo/deciphraze/discussions" target="_blank" rel="noopener noreferrer">Contact</a>
						</DeciText>

					</div>
				</div>
			}
			onBack={onBack}
		/>
	);
}
