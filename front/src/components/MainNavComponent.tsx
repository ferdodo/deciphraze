import { useState, useEffect } from "react";
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
import { useHasNewAchievements } from "../hooks/useHasNewAchievements";
import { share } from "../utils/share";
import { useGameContext } from "../hooks/useGameContext";
import { useIsTodayGame } from "../hooks/useIsTodayGame";
import { playTodayGame } from "../usecases/playTodayGame";
import type { Settings } from "../entities/Settings";

import type React from "react";

export function MainNavComponent(): React.JSX.Element {
	const paragraphOfTheDay = useParagraphOfTheDay();
	const separatedWords = paragraphOfTheDay.split(" ");
	const words = separatedWords.map((word) => [...word]);
	const alphabetRandom = useSymbolsRandomOrder();

	const win = useWin();
	const matchCount = useMatchCount();
	const hasNewAchievements = useHasNewAchievements();
	const isTodayGame = useIsTodayGame();
	const context = useGameContext();

	const handleShare = (): void => {
		share(matchCount);
	};

	const handlePlayTodayGame = (): void => {
		playTodayGame(context);
	};

	const { settingsRepository } = context;
	const [hideInstructions, setHideInstructions] = useState<boolean>(() => 
		settingsRepository.getSettings().hideInstructions
	);

	useEffect(() => {
		const subscription = settingsRepository.settings$.subscribe((settings: Settings) => {
			setHideInstructions(settings.hideInstructions);
		});
		return () => subscription.unsubscribe();
	}, [settingsRepository]);

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
			hideInstructions={hideInstructions}
			hasNewAchievements={hasNewAchievements}
			isTodayGame={isTodayGame}
			onPlayTodayGame={handlePlayTodayGame}
		/>
	);
}

