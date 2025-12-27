interface DeciGameProps {
	Statistics: React.ReactNode;
	Achievements: React.ReactNode;
	DevelopmentPanel: React.ReactNode;
	Paragraph: React.ReactNode;
	Alphabet: React.ReactNode;
	Symbols: React.ReactNode;
	paragraphOfYesterday: string;
	alphabetRandom: string[];
	win: boolean;
	words: string[][];
	onShare: () => void;
}

export function DeciGame({
	Statistics,
	Achievements,
	DevelopmentPanel,
	paragraphOfYesterday,
	Alphabet,
	Symbols,
	Paragraph,
	win,
	onShare,
}: DeciGameProps): JSX.Element {
	return (
		<div style={{display: "grid", height: "100svh"}}>
		<crumbs-nav style={{ flexGrow: "1" }}>
			<crumbs-p slot="title-1">Jouer</crumbs-p>
			<crumbs-panel slot="content-1" panel-title="Deciphraze" style={{ maxHeight: "calc(100vh - 14.5rem)" }}>
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

			<crumbs-p slot="title-2">Solution d'hier</crumbs-p>
			<crumbs-panel slot="content-2" panel-title="Solution d'hier" style={{ maxHeight: "calc(100vh - 14.5rem)"}}>
				<crumbs-p>
					{paragraphOfYesterday}
				</crumbs-p>
			</crumbs-panel>

			<crumbs-p slot="title-3">Succès</crumbs-p>
			<crumbs-panel slot="content-3" panel-title="Succès" style={{ maxHeight: "calc(100vh - 14.5rem)"}}>
				{Achievements}
			</crumbs-panel>

			<crumbs-p slot="title-4">Statistiques</crumbs-p>
			<crumbs-panel slot="content-4" panel-title="Statistiques" style={{ maxHeight: "calc(100vh - 14.5rem)"}}>
				{Statistics}
			</crumbs-panel>

			{DevelopmentPanel}
		</crumbs-nav>
		</div>
	);
};

