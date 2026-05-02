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
import { useRevealString } from "../hooks/useRevealString";
import { useSymbolsRandomOrder } from "../hooks/useSymbolsRandomOrder";
import { useHasNewAchievements } from "../hooks/useHasNewAchievements";
import { share } from "../utils/share";
import { useGameContext } from "../hooks/useGameContext";
import { useIsTodayGame } from "../hooks/useIsTodayGame";
import { playTodayGame } from "../usecases/playTodayGame";
import { abandonGame } from "../usecases/abandonGame";
import { useAssociationHistory } from "../hooks/useAssociationHistory";
import { useGameDay } from "../hooks/useGameDay";
import type { Settings } from "@deciphraze/core";

import type React from "react";

export function MainNavComponent(): React.JSX.Element {
	const paragraphOfTheDay = useParagraphOfTheDay();
	const separatedWords = paragraphOfTheDay.split(" ");
	const words = separatedWords.map((word) => [...word]);

	const { paragraphReveal, unrevealedWords } = useRevealString(paragraphOfTheDay);
	const revealedWords = paragraphReveal
		.split(" ")
		.map((word) => [...word]);
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

	const handleAbandonGame = (): void => {
		abandonGame(context);
	};

	const { settingsRepository } = context;
	const [hideInstructions, setHideInstructions] = useState<boolean>(() => 
		settingsRepository.getSettings().hideInstructions
	);
	const [showAssociationHistory, setShowAssociationHistory] = useState<boolean>(() =>
		settingsRepository.getSettings().showAssociationHistory
	);
	const [showGameDayDate, setShowGameDayDate] = useState<boolean>(() =>
		settingsRepository.getSettings().showGameDayDate
	);
	const associationHistory = useAssociationHistory();
	const gameDay = useGameDay();

	useEffect(() => {
		const subscription = settingsRepository.settings$.subscribe((settings: Settings) => {
			setHideInstructions(settings.hideInstructions);
			setShowAssociationHistory(settings.showAssociationHistory);
			setShowGameDayDate(settings.showGameDayDate);
		});
		return () => subscription.unsubscribe();
	}, [settingsRepository]);

	return (
		<DeciMainNav
			Achievements={<AchievementsComponent />}
			PlusMenu={<PlusComponent />}
			Paragraph={<ParagraphComponent words={revealedWords} unrevealedWords={unrevealedWords} />}
			Alphabet={<AlphabetComponent />}
			Symbols={<SymbolsComponent />}
			alphabetRandom={alphabetRandom}
			words={words}
			win={win}
			onShare={handleShare}
			hideInstructions={hideInstructions}
			showAssociationHistory={showAssociationHistory}
			associationHistory={associationHistory}
			showGameDayDate={showGameDayDate}
			gameDay={gameDay}
			hasNewAchievements={hasNewAchievements}
			isTodayGame={isTodayGame}
			onPlayTodayGame={handlePlayTodayGame}
			onAbandon={handleAbandonGame}
		/>
	);
}
