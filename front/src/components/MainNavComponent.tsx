import { DeciMainNav } from "@deciphraze/ds";
import { ParagraphComponent } from "./ParagraphComponent";
import { AlphabetComponent } from "./AlphabetComponent";
import { SymbolsComponent } from "./SymbolsComponent";
import { AchievementsComponent } from "./AchievementsComponent";
import { PlusMenuComponent } from "./PlusMenuComponent";
import { useMatchCount } from "../hooks/useMatchCount";
import { useWin } from "../hooks/useWin";
import { useParagraphOfTheDay } from "../hooks/useParagraphOfTheDay";
import { useSymbolsRandomOrder } from "../hooks/useSymbolsRandomOrder";
import { share } from "../utils/share";
import type { PlusView } from "../types/PlusView";

interface MainNavComponentProps {
	onPlusViewChange: (view: PlusView) => void;
}

import React from "react";

export function MainNavComponent({ onPlusViewChange }: MainNavComponentProps): React.JSX.Element {
	const paragraphOfTheDay = useParagraphOfTheDay();
	const separatedWords = paragraphOfTheDay.split(" ");
	const words = separatedWords.map((word) => [...word]);
	const alphabetRandom = useSymbolsRandomOrder();

	const win = useWin();
	const matchCount = useMatchCount();

	const handleShare = (): void => {
		share(matchCount);
	};

	return (
		<DeciMainNav
			Achievements={<AchievementsComponent />}
			PlusMenu={<PlusMenuComponent onViewChange={onPlusViewChange} />}
			Paragraph={<ParagraphComponent words={words} />}
			Alphabet={<AlphabetComponent />}
			Symbols={<SymbolsComponent />}
			alphabetRandom={alphabetRandom}
			words={words}
			win={win}
			onShare={handleShare}
		/>
	);
}

