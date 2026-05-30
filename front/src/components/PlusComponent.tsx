import type React from "react";
import { useState } from "react";
import { PlusMenuComponent } from "./PlusMenuComponent";
import { InstallComponent } from "./InstallComponent";
import { SettingsPanelComponent } from "./SettingsPanelComponent";
import { StatisticsComponent } from "./StatisticsComponent";
import { YesterdaySolutionComponent } from "./YesterdaySolutionComponent";
import { DevelopmentPanelComponent } from "./DevelopmentPanelComponent";
import { AboutComponent } from "./AboutComponent";
import { ChallengeMenuComponent } from "./ChallengeMenuComponent";
import { useIsPlatinumEarned } from "../hooks/useIsPlatinumEarned";
import type { PlusView } from "../types/PlusView";

export function PlusComponent(): React.JSX.Element {
	const [plusView, setPlusView] = useState<PlusView>("main");
	const isPlatinumEarned = useIsPlatinumEarned();

	const handlePlusViewChange = (view: PlusView): void => {
		setPlusView(view);
	};

	const handleBack = (): void => {
		setPlusView("main");
	};

	switch (plusView) {
		case "main":
			return <PlusMenuComponent onViewChange={handlePlusViewChange} />;
		case "install":
			return <InstallComponent onBack={handleBack} />;
		case "settings":
			return <SettingsPanelComponent onBack={handleBack} />;
		case "statistics":
			return <StatisticsComponent onBack={handleBack} />;
		case "yesterday":
			return <YesterdaySolutionComponent onBack={handleBack} />;
		case "development":
			return <DevelopmentPanelComponent onBack={handleBack} />;
		case "about":
			return <AboutComponent onBack={handleBack} />;
		case "challenge":
			return <ChallengeMenuComponent isPlatinumEarned={isPlatinumEarned} onBack={handleBack} />;
	}
}

