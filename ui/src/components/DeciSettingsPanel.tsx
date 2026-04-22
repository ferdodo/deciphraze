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
				<DeciText variant="muted">
					Permet de rafraîchir la page en tirant vers le bas depuis le haut de l'écran, uniquement sur mobile.
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
				<div style={{ marginTop: "1.5rem" }}>
					<DeciText variant="muted">
						Affiche l'historique des associations de la partie actuelle sous les instructions.
					</DeciText>
					<crumbs-button
						title={isShowAssociationHistoryEnabled ? "Cacher l'historique des associations" : "Afficher l'historique des associations"}
						onClick={onToggleShowAssociationHistory}
						role="button"
					>
						<DeciText variant="command">
							{isShowAssociationHistoryEnabled ? "Historique visible" : "Historique caché"}
						</DeciText>
					</crumbs-button>
				</div>
				<div style={{ marginTop: "1.5rem" }}>
					<DeciText variant="muted">
						Affiche la date de la partie actuellement jouée.
					</DeciText>
					<crumbs-button
						title={isShowGameDayDateEnabled ? "Cacher la date de la partie" : "Afficher la date de la partie"}
						onClick={onToggleShowGameDayDate}
						role="button"
					>
						<DeciText variant="command">
							{isShowGameDayDateEnabled ? "Date de la partie visible" : "Date de la partie cachée"}
						</DeciText>
					</crumbs-button>
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
