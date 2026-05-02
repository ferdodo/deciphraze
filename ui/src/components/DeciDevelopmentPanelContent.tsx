import type React from "react";

interface DeciDevelopmentPanelContentProps {
	currentDay: string;
	onIncrementDay: () => void;
	onDecrementDay: () => void;
	onAddPlatinum: () => void;
	codeLevel: string;
	onCodeLevelChange: (value: string) => void;
	codeDay: string;
	onCodeDayChange: (value: string) => void;
	onGenerateCode: () => void;
	generatedCode?: string;
}

export function DeciDevelopmentPanelContent({
	currentDay,
	onIncrementDay,
	onDecrementDay,
	onAddPlatinum,
	codeLevel,
	onCodeLevelChange,
	codeDay,
	onCodeDayChange,
	onGenerateCode,
	generatedCode,
}: DeciDevelopmentPanelContentProps): React.JSX.Element {
	return (
		<div style={{ padding: "1rem" }}>
			<crumbs-p>
				Date actuelle : {currentDay}
			</crumbs-p>
			<br />
			<div style={{ display: "flex", gap: "1rem" }}>
				<crumbs-button
					title="Jour précédent"
					onClick={onDecrementDay}
					role="button"
				>
					← Jour précédent
				</crumbs-button>
				<crumbs-button
					title="Jour suivant"
					onClick={onIncrementDay}
					role="button"
				>
					Jour suivant →
				</crumbs-button>
			</div>
			<br />
			<div>
				<crumbs-button
					title="Ajouter le platine"
					onClick={onAddPlatinum}
					role="button"
				>
					✨ Ajouter Platine
				</crumbs-button>
			</div>
			<br />
			<div style={{ borderTop: "1px solid #ccc", paddingTop: "1rem" }}>
				<crumbs-p>Générateur de Code</crumbs-p>
				<div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "center" }}>
					<label htmlFor="codeLevel">Niveau:</label>
					<input
						id="codeLevel"
						type="number"
						min="1"
						value={codeLevel}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCodeLevelChange(e.target.value)}
						style={{ width: "60px" }}
					/>
					<label htmlFor="codeDay">Jour:</label>
					<input
						id="codeDay"
						type="text"
						value={codeDay}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCodeDayChange(e.target.value)}
						style={{ flex: 1 }}
					/>
				</div>
				<crumbs-button
					onClick={onGenerateCode}
					role="button"
				>
					Générer Code
				</crumbs-button>
				{generatedCode && (
					<div style={{ marginTop: "1rem", padding: "0.5rem", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
						<p style={{ margin: "0 0 0.5rem 0", fontSize: "0.875rem" }}>Code généré:</p>
						<code style={{ display: "block", fontFamily: "monospace", fontWeight: "bold", userSelect: "text" }}>
							{generatedCode}
						</code>
					</div>
				)}
			</div>
		</div>
	);
}

