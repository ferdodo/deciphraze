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
							Crédits
						</DeciText>
						<DeciText variant="muted">
							• Livre : Paris (1898) par Émile Zola - Domaine public
						</DeciText>
						<DeciText variant="muted">
							• Police de symboles : Glipervelz par Freddy V.P.
						</DeciText>
						<DeciText variant="muted">
							• Police de texte : Yrsa par Rosetta, Anna Giedryś, David Březina (OFL)
						</DeciText>
						<DeciText variant="muted">
							• Police de titres : Neuton par Brian Zick (OFL)
						</DeciText>
					</div>


					<div style={{ marginBottom: "2rem" }}>
						<DeciText variant="sectionTitle">
							Bugs & Support
						</DeciText>
						<DeciText variant="muted">
							Pour signaler un bug ou une anomalie :
						</DeciText>
						<DeciText variant="muted">
							• GitHub Issues : https://github.com/ferdodo/deciphraze/issues
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
							• Contact : https://github.com/ferdodo/deciphraze/discussions
						</DeciText>
						<DeciText variant="muted">
							• License: MIT
						</DeciText>
					</div>
				</div>
			}
			onBack={onBack}
		/>
	);
}
