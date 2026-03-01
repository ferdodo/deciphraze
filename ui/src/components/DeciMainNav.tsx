import type React from "react";
import styles from "./DeciMainNav.module.css";
import { DeciText } from "./DeciText";

interface DeciMainNavProps {
	Achievements: React.ReactNode;
	PlusMenu: React.ReactNode;
	Paragraph: React.ReactNode;
	Alphabet: React.ReactNode;
	Symbols: React.ReactNode;
	alphabetRandom: string[];
	win: boolean;
	words: string[][];
	onShare: () => void;
	hideInstructions: boolean;
	hasNewAchievements: boolean;
	isTodayGame: boolean;
	onPlayTodayGame: () => void;
	onAbandon: () => void;
}

export function DeciMainNav({
	Achievements,
	PlusMenu,
	Alphabet,
	Symbols,
	Paragraph,
	win,
	onShare,
	hideInstructions,
	hasNewAchievements,
	isTodayGame,
	onPlayTodayGame,
	onAbandon,
}: DeciMainNavProps): React.JSX.Element {
	return (
		<div className={styles.container}>
			<crumbs-nav className={styles.nav}>
				<span slot="title-1"><DeciText variant="command">Jouer</DeciText></span>
				<crumbs-panel slot="content-1" panel-title="Deciphraze - beta.4" className={`${styles.panel} ${styles.panelContent1}`}>
					{!hideInstructions && (
						<div style={{ paddingTop: "0.5rem", paddingBottom: "0.8rem" }}>
							<DeciText variant="default">
								Déchiffrez le paragraphe suivant en associant les lettres aux bons
								symboles.
							</DeciText>
						</div>
					)}

					{Paragraph}

					{!win && (
						<>
							<br />
							<br />

							<div>
								{Alphabet}
							</div>

							<br />

							<div>
								{Symbols}
							</div>

							{!isTodayGame && (
								<>
									<div style={{ marginTop: "1rem", textAlign: "center", opacity: 0.7 }}>
										<em>
											<DeciText variant="default">
												Vous ne jouez pas la partie d'aujourd'hui
												<br />
												Cette partie sera quand même comptabilisée pour vos succès
											</DeciText>
										</em>
									</div>
									<div style={{ marginTop: "1rem", textAlign: "center" }}>
										<crumbs-button
											title="Jouer la partie d'aujourd'hui"
											onClick={onAbandon}
											role="button"
										>
											Jouer la partie d'aujourd'hui
										</crumbs-button>
									</div>
								</>
							)}
						</>
					)}

					{win && (
						<div>
							<crumbs-p className={styles.winText}>
								🎉 C'est gagné{isTodayGame ? " pour aujourd'hui" : ""} ! 🥳 <br />
								<crumbs-button
									title="Copier dans le presse-papier"
									onClick={onShare}
									role="button"
								>
									Partager
								</crumbs-button>
								{!isTodayGame && (
									<>
										<br />
										<crumbs-button
											title="Jouer le jeu d'aujourd'hui"
											onClick={onPlayTodayGame}
											role="button"
										>
											Jouer la partie d'aujourd'hui
										</crumbs-button>
									</>
								)}
							</crumbs-p>
						</div>
					)}
				</crumbs-panel>

				<div slot="title-2" style={{ display: "inline-block", position: "relative", lineHeight: "0" }}>
					{hasNewAchievements && <crumbs-new-content-indicator />}
					<DeciText variant="command"> Succès </DeciText>
				</div>
				<crumbs-panel slot="content-2" panel-title="Succès" className={styles.panel}>
					{Achievements}
				</crumbs-panel>

				<span slot="title-3"><DeciText variant="command">Plus</DeciText></span>
				<div slot="content-3" className={styles.content3}>
					{PlusMenu}
				</div>
			</crumbs-nav>
		</div>
	);
};

