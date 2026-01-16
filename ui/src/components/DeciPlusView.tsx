import type React from "react";

interface DeciPlusViewProps {
	title: string;
	content: React.ReactNode;
	onBack: () => void;
}

export function DeciPlusView({ title, content, onBack }: DeciPlusViewProps): React.JSX.Element {
	return (
        <div style={{ display: "grid", placeContent: "center" }}>
		<crumbs-panel panel-title={title} style={{ maxHeight: "calc(100svh - 14.5rem)" }}>
			{content}
			<div slot="footer">
				<crumbs-button
					title="Retour"
					onClick={onBack}
					role="button"
				>
					Retour
				</crumbs-button>
			</div>
		</crumbs-panel>
        </div>
	);
}

