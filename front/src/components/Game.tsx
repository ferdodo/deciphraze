import { useState } from "react";
import { MainNavComponent } from "./MainNavComponent";
import { SettingsPanelComponent } from "./SettingsPanelComponent";
import { StatisticsComponent } from "./StatisticsComponent";
import { YesterdaySolutionComponent } from "./YesterdaySolutionComponent";
import { DevelopmentPanelComponent } from "./DevelopmentPanelComponent";

export function Game(): JSX.Element {
	const [plusView, setPlusView] = useState<string | null>(null);

	const handlePlusViewChange = (view: string | null): void => {
		setPlusView(view);
	};

	switch (plusView) {
		case "settings":
			return (
				<SettingsPanelComponent onBack={() => handlePlusViewChange(null)} />
			);
		case "statistics":
			return (
				<StatisticsComponent onBack={() => handlePlusViewChange(null)} />
			);
		case "yesterday":
			return (
				<YesterdaySolutionComponent onBack={() => handlePlusViewChange(null)} />
			);
		case "development":
			return (
				<DevelopmentPanelComponent onBack={() => handlePlusViewChange(null)} />
			);
		default:
			return (
				<MainNavComponent onPlusViewChange={handlePlusViewChange} />
			);
	}
};