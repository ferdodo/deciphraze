import type React from "react";
import { DeciText } from "./DeciText";

interface DeciSettingsPanelProps {
	onToggleFullscreen: () => void;
	onTogglePullToRefresh: () => void;
	isPullToRefreshEnabled: boolean;
	onResetData: () => void;
	onToggleHideInstructions: () => void;
	isHideInstructionsEnabled: boolean;
	onToggleShowAssociationHistory: () => void;
	isShowAssociationHistoryEnabled: boolean;
	onToggleShowGameDayDate: () => void;
	isShowGameDayDateEnabled: boolean;
	textSize: number;
	onIncreaseTextSize: () => void;
	onDecreaseTextSize: () => void;
	commandTextSize: number;
	onIncreaseCommandTextSize: () => void;
	onDecreaseCommandTextSize: () => void;
}

export function DeciSettingsPanel({ onToggleFullscreen, onTogglePullToRefresh, isPullToRefreshEnabled, onResetData, onToggleHideInstructions, isHideInstructionsEnabled, onToggleShowAssociationHistory, isShowAssociationHistoryEnabled, onToggleShowGameDayDate, isShowGameDayDateEnabled, textSize, onIncreaseTextSize, onDecreaseTextSize, commandTextSize, onIncreaseCommandTextSize, onDecreaseCommandTextSize }: DeciSettingsPanelProps): React.JSX.Element {

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
				<div style={{ marginTop: "1.5rem" }}>
					<DeciText variant="muted">
						Taille du texte: {textSize.toFixed(1)}
					</DeciText>
					<div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
						<crumbs-button
							title="Diminuer la taille du texte"
							onClick={onDecreaseTextSize}
							role="button"
						>
							<DeciText variant="command">−</DeciText>
						</crumbs-button>
						<crumbs-button
							title="Augmenter la taille du texte"
							onClick={onIncreaseTextSize}
							role="button"
						>
							<DeciText variant="command">+</DeciText>
						</crumbs-button>
					</div>
				</div>
				<div style={{ marginTop: "1.5rem" }}>
					<DeciText variant="muted">
						Taille du texte des éléments interactifs: {commandTextSize.toFixed(1)}
					</DeciText>
					<div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
						<crumbs-button
							title="Diminuer la taille du texte des éléments interactifs"
							onClick={onDecreaseCommandTextSize}
							role="button"
						>
							<DeciText variant="command">−</DeciText>
						</crumbs-button>
						<crumbs-button
							title="Augmenter la taille du texte des éléments interactifs"
							onClick={onIncreaseCommandTextSize}
							role="button"
						>
							<DeciText variant="command">+</DeciText>
						</crumbs-button>
					</div>
				</div>
			</div>
			<div style={{ marginTop: "2rem" }}>
				<DeciText variant="sectionTitle">
					Comportement
				</DeciText>
				<div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
					<div style={{ flex: 1, width: "min-content" }}>
						<DeciText variant="command">
							Pull-to-refresh
						</DeciText>
						<DeciText variant="muted">
							Permet de rafraîchir la page en tirant vers le bas depuis le haut de l'écran, uniquement sur mobile.
						</DeciText>
					</div>
					<crumbs-switch
						checked={isPullToRefreshEnabled}
						onChange={onTogglePullToRefresh}
					/>
				</div>
			</div>
			<div style={{ marginTop: "2rem" }}>
				<DeciText variant="sectionTitle">
					Jeu
				</DeciText>
				<div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
					<div style={{ flex: 1 }}>
						<DeciText variant="command">
							Cacher les instructions
						</DeciText>
						<DeciText variant="muted">
							Libérez de l'espace sur l'écran si vous les connaissez déjà.
						</DeciText>
					</div>
					<crumbs-switch
						checked={isHideInstructionsEnabled}
						onChange={onToggleHideInstructions}
					/>
				</div>
				<div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
					<div style={{ flex: 1 }}>
						<DeciText variant="command">
							Afficher l'historique des associations
						</DeciText>
						<DeciText variant="muted">
							Pour savoir dans quel ordre vous avez associé les lettres de la partie actuelle.
						</DeciText>
					</div>
					<crumbs-switch
						checked={isShowAssociationHistoryEnabled}
						onChange={onToggleShowAssociationHistory}
					/>
				</div>
				<div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
					<div style={{ flex: 1 }}>
						<DeciText variant="command">
							Afficher la date de la partie
						</DeciText>
						<DeciText variant="muted">
							Affiche la date de la partie actuellement jouée.
						</DeciText>
					</div>
					<crumbs-switch
						checked={isShowGameDayDateEnabled}
						onChange={onToggleShowGameDayDate}
					/>
				</div>
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
