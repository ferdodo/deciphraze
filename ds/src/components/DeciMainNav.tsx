import React from "react";

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
}

export function DeciMainNav({
	Achievements,
	PlusMenu,
	Alphabet,
	Symbols,
	Paragraph,
	win,
	onShare,
}: DeciMainNavProps): React.JSX.Element {
	return (
		<div style={{display: "grid", height: "100svh"}}>
		<crumbs-nav style={{ flexGrow: "1" }}>
			<crumbs-p slot="title-1">Jouer</crumbs-p>
			<crumbs-panel slot="content-1" panel-title="Deciphraze" style={{ maxHeight: "calc(100svh - 14.5rem)", maxWidth: "54rem" }}>
				<crumbs-p>
					Déchiffrez le paragraphe suivant en associant les lettres aux bons
					symboles.
				</crumbs-p>

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
						<crumbs-p style={{ textAlign: "center" }}>
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
		<crumbs-panel slot="content-2" panel-title="Succès" style={{ maxHeight: "calc(100svh - 14.5rem)" }}>
			{Achievements}
		</crumbs-panel>

		<crumbs-p slot="title-3">Plus</crumbs-p>
		<div slot="content-3" style={{ maxHeight: "calc(100svh - 14.5rem)" }}>
			{PlusMenu}
		</div>
		</crumbs-nav>
		</div>
	);
};

