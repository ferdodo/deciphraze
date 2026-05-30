import type React from "react";
import { DeciText } from "./DeciText";

interface DeciPlusViewProps {
	title: string;
	content: React.ReactNode;
	onBack: () => void;
}

export function DeciPlusView({ title, content, onBack }: DeciPlusViewProps): React.JSX.Element {
	return (
        <div style={{ display: "grid", placeContent: "center" }}>
		<crumbs-panel panel-title={title} style={{ maxHeight: "calc(100dvh - 8.5rem)" }}>
			{content}
			<div slot="footer">
				<crumbs-button
					title="Retour"
					onClick={onBack}
					role="button"
				>
					<DeciText variant="command">Retour</DeciText>
				</crumbs-button>
			</div>
		</crumbs-panel>
        </div>
	);
}

