import { DeciMainNav } from "@deciphraze/ui";
import { ParagraphComponent } from "./ParagraphComponent";
import { AlphabetComponent } from "./AlphabetComponent";
import { SymbolsComponent } from "./SymbolsComponent";
import { AchievementsComponent } from "./AchievementsComponent";
import { PlusComponent } from "./PlusComponent";
import { useMatchCount } from "../hooks/useMatchCount";
import { useWin } from "../hooks/useWin";
import { useParagraphOfTheDay } from "../hooks/useParagraphOfTheDay";
import { useSymbolsRandomOrder } from "../hooks/useSymbolsRandomOrder";
import { share } from "../utils/share";

import type React from "react";

export function MainNavComponent(): React.JSX.Element {
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
			PlusMenu={<PlusComponent />}
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

