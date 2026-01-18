import type React from "react";
import styles from "./DeciMainNav.module.css";

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
}: DeciMainNavProps): React.JSX.Element {
	return (
		<div className={styles.container}>
			<crumbs-nav className={styles.nav}>
				<crumbs-p slot="title-1">Jouer</crumbs-p>
				<crumbs-panel slot="content-1" panel-title="Deciphraze" className={`${styles.panel} ${styles.panelContent1}`}>
					{!hideInstructions && (
						<crumbs-p>
							Déchiffrez le paragraphe suivant en associant les lettres aux bons
							symboles.
						</crumbs-p>
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
						</>
					)}

					{win && (
						<div>
							<crumbs-p className={styles.winText}>
								🎉 C'est gagné pour aujourd'hui ! 🥳 <br />
								<crumbs-button
									title="Copier dans le presse-papier"
									onClick={onShare}
									role="button"
								>
									Partager
								</crumbs-button>
							</crumbs-p>
						</div>
					)}
				</crumbs-panel>

				<crumbs-p slot="title-2">Succès</crumbs-p>
				<crumbs-panel slot="content-2" panel-title="Succès" className={styles.panel}>
					{Achievements}
				</crumbs-panel>

				<crumbs-p slot="title-3">Plus</crumbs-p>
				<div slot="content-3" className={styles.content3}>
					{PlusMenu}
				</div>
			</crumbs-nav>
		</div>
	);
};

