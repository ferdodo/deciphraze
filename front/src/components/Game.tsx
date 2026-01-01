import React, { useState } from "react";
import { MainNavComponent } from "./MainNavComponent";
import { SettingsPanelComponent } from "./SettingsPanelComponent";
import { StatisticsComponent } from "./StatisticsComponent";
import { YesterdaySolutionComponent } from "./YesterdaySolutionComponent";
import { DevelopmentPanelComponent } from "./DevelopmentPanelComponent";
import type { PlusView } from "../types/PlusView";

export function Game(): React.JSX.Element {
	const [plusView, setPlusView] = useState<PlusView>("main");

	const handlePlusViewChange = (view: PlusView): void => {
		setPlusView(view);
	};

	switch (plusView) {
		case "settings":
			return (
				<SettingsPanelComponent onBack={() => handlePlusViewChange("main")} />
			);
		case "statistics":
			return (
				<StatisticsComponent onBack={() => handlePlusViewChange("main")} />
			);
		case "yesterday":
			return (
				<YesterdaySolutionComponent onBack={() => handlePlusViewChange("main")} />
			);
		case "development":
			return (
				<DevelopmentPanelComponent onBack={() => handlePlusViewChange("main")} />
			);
		default:
			return (
				<MainNavComponent onPlusViewChange={handlePlusViewChange} />
			);
	}
};