import type React from "react";
import { DeciPlusView } from "@deciphraze/ui";

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
						<p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "1rem" }}>
							Crédits
						</p>
						<p style={{ fontSize: "0.85rem", color: "#888", lineHeight: "1.4", marginBottom: "0.5rem" }}>
							• Livre : Paris (1898)
						</p>
						<p style={{ fontSize: "0.85rem", color: "#888", lineHeight: "1.4", marginBottom: "0.5rem" }}>
							• Auteur : Émile Zola
						</p>
						<p style={{ fontSize: "0.85rem", color: "#888", lineHeight: "1.4", marginBottom: "0.5rem" }}>
							• Droits d'utilisation : Domaine public (œuvre de 1898)
						</p>
						<p style={{ fontSize: "0.85rem", color: "#888", lineHeight: "1.4", marginBottom: "0.5rem" }}>
							• Police de symboles : Glipervelz (Free for personal use)
						</p>
						<p style={{ fontSize: "0.85rem", color: "#888", lineHeight: "1.4", marginBottom: "0.5rem" }}>
							• Auteur de la police : Freddy V.P.
						</p>
					</div>


					<div style={{ marginBottom: "2rem" }}>
						<p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "1rem" }}>
							Bugs & Support
						</p>
						<p style={{ fontSize: "0.85rem", color: "#888", lineHeight: "1.4", marginBottom: "0.5rem" }}>
							Pour signaler un bug ou une anomalie :
						</p>
						<p style={{ fontSize: "0.85rem", color: "#888", lineHeight: "1.4" }}>
							• GitHub Issues : https://github.com/ferdodo/deciphraze/issues
						</p>
					</div>

					<div style={{ marginBottom: "2rem" }}>
						<p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "1rem" }}>
							Données personnelles
						</p>
						<p style={{ fontSize: "0.85rem", color: "#888", lineHeight: "1.4", marginBottom: "0.5rem" }}>
							• Vos données de jeu sont stockées localement sur votre appareil
						</p>
						<p style={{ fontSize: "0.85rem", color: "#888", lineHeight: "1.4", marginBottom: "0.5rem" }}>
							• Aucune donnée personnelle n'est collectée
						</p>
						<p style={{ fontSize: "0.85rem", color: "#888", lineHeight: "1.4", marginBottom: "0.5rem" }}>
							• Vous pouvez supprimer toutes vos données à tout moment dans les paramètres
						</p>
					</div>

					<div style={{ marginBottom: "2rem" }}>
						<p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "1rem" }}>
							Mentions légales
						</p>
						<p style={{ fontSize: "0.85rem", color: "#888", lineHeight: "1.4", marginBottom: "0.5rem" }}>
							Éditeur : https://github.com/ferdodo
						</p>
						<p style={{ fontSize: "0.85rem", color: "#888", lineHeight: "1.4", marginBottom: "0.5rem" }}>
							Contact : https://github.com/ferdodo/deciphraze/discussions
						</p>
						<p style={{ fontSize: "0.85rem", color: "#888", lineHeight: "1.4", marginBottom: "0.5rem" }}>
							License: MIT
						</p>
					</div>
				</div>
			}
			onBack={onBack}
		/>
	);
}
