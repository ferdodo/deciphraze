import { useDay } from "../hooks/useDay";
import { useGameContext } from "../hooks/useGameContext";
import { isDev } from "../utils/isDev";
import { incrementDay } from "../usecases/incrementDay";
import { decrementDay } from "../usecases/decrementDay";

export function DevelopmentPanelComponent(): JSX.Element | null {
	const context = useGameContext();
	const currentDay = useDay();

	const handleIncrementDay = (): void => {
		incrementDay(context);
	};

	const handleDecrementDay = (): void => {
		decrementDay(context);
	};

	if (!isDev()) {
		return null;
	}

	return (
		<>
			<crumbs-p slot="title-5">Développement</crumbs-p>
			<crumbs-panel slot="content-5" panel-title="Développement" style={{ maxHeight: "calc(100vh - 14.5rem)"}}>
				<crumbs-p>
					Date actuelle : {currentDay}
				</crumbs-p>
				<br />
				<div style={{ display: "flex", gap: "1rem" }}>
					<crumbs-button
						title="Jour précédent"
						onClick={handleDecrementDay}
						role="button"
					>
						← Jour précédent
					</crumbs-button>
					<crumbs-button
						title="Jour suivant"
						onClick={handleIncrementDay}
						role="button"
					>
						Jour suivant →
					</crumbs-button>
				</div>
			</crumbs-panel>
		</>
	);
};

