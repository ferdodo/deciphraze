import type React from "react";
import { useMemo } from "react";
import { createRoot, type Root } from "react-dom/client";
import { paragraphOfTheDay } from "./paragraphOfTheDay";
import { FragmentComponent } from "./components/FragmentComponent";
import { LetterComponent } from "./components/LetterComponent";
import { SymbolComponent } from "./components/SymbolComponent";
import { AchievementsComponent } from "./components/AchievementsComponent";
import { GameProvider } from "./providers/GameProvider";
import { generateRandomAlphabet } from "./utils/generateRandomAlphabet";
import { useMatchCount } from "./hooks/useMatchCount";
import { useWin } from "./hooks/useWin";
import { share } from "./utils/share";
import "crumbs-design-system";
import { paragraphOfYesterday } from "./paragraphOfYesterday";
import "./styles/global.module.css";

const GameApp: React.FC = () => {
	const separatedWords = paragraphOfTheDay.split(" ");
	const words = separatedWords.map((word) => [...word]);
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	const alphabetRandom = useMemo(() => {
		const CHEAT_MODE = true;
		return generateRandomAlphabet(CHEAT_MODE);
	}, []);
	const win = useWin();
	const matchCount = useMatchCount();

	const handleShare = (): void => {
		share(matchCount);
	};

	return (
		<crumbs-panel panel-title="Deciphraze">
			<div>
				<crumbs-p>
					Déchiffrez le paragraphe suivant en associant les lettres aux bons
					symboles.
				</crumbs-p>

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

				<br />
				<br />

				<div>
					{alphabet.map((l) => (
						<LetterComponent key={l} character={l} />
					))}
				</div>

				<br />

				<div>
					{alphabetRandom.map((l) => (
						<SymbolComponent key={l} character={l} />
					))}
				</div>

				<crumbs-p>
					<details style={{ marginTop: "5rem" }}>
						<summary> Solution d'hier </summary>
						{paragraphOfYesterday}
					</details>
				</crumbs-p>

				<AchievementsComponent />
			</div>

			{win && (
				<div>
					<crumbs-p style={{ textAlign: "center" }}>
						🎉 C'est gagné pour aujourd'hui ! 🥳 <br />
						<crumbs-button
							title="Copier dans le presse-papier"
							onClick={handleShare}
							role="button"
						>
							Partager
						</crumbs-button>
					</crumbs-p>
				</div>
			)}
		</crumbs-panel>
	);
};

const App: React.FC = () => {
	return (
		<GameProvider>
			<GameApp />
		</GameProvider>
	);
};

const container: HTMLElement = document.body;
const root: Root = createRoot(container);
root.render(<App />);
