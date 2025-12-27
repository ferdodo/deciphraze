import type React from "react";
import { DeciGame } from "@deciphraze/ds";
import { FragmentComponent } from "./FragmentComponent";
import { AchievementsComponent } from "./AchievementsComponent";
import { StatisticsComponent } from "./StatisticsComponent";
import { AlphabetComponent } from "./AlphabetComponent";
import { SymbolsComponent } from "./SymbolsComponent";
import { DevelopmentPanelComponent } from "./DevelopmentPanelComponent";
import { useMatchCount } from "../hooks/useMatchCount";
import { useWin } from "../hooks/useWin";
import { useParagraphOfYesterday } from "../hooks/useParagraphOfYesterday";
import { useParagraphOfTheDay } from "../hooks/useParagraphOfTheDay";
import { useSymbolsRandomOrder } from "../hooks/useSymbolsRandomOrder";
import { share } from "../utils/share";

const Game: React.FC = () => {
	const paragraphOfTheDay = useParagraphOfTheDay();
	const separatedWords = paragraphOfTheDay.split(" ");
	const words = separatedWords.map((word) => [...word]);
	const alphabetRandom = useSymbolsRandomOrder();

	const win = useWin();
	const matchCount = useMatchCount();
	const paragraphOfYesterday = useParagraphOfYesterday();

	const handleShare = (): void => {
		share(matchCount);
	};

	const paragraph = (
		<>
			{words.map((word, wordIndex) => (
				<div
					key={`word-${word.join("")}-${wordIndex}`}
					style={{ display: "inline-block", marginRight: "0.9rem" }}
				>
					{word.map((f, fragmentIndex) => (
						<FragmentComponent
							key={`${f}-${word.join("")}-${fragmentIndex}`}
							character={f}
						/>
					))}
				</div>
			))}
		</>
	);

	return (
		<DeciGame
			Statistics={<StatisticsComponent />}
			Achievements={<AchievementsComponent />}
			DevelopmentPanel={<DevelopmentPanelComponent />}
			Paragraph={paragraph}
			Alphabet={<AlphabetComponent />}
			Symbols={<SymbolsComponent />}
			paragraphOfYesterday={paragraphOfYesterday}
			alphabetRandom={alphabetRandom}
			words={words}
			win={win}
			onShare={handleShare}
		/>
	);
};

export { Game };
