import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { paragraphOfTheDay } from "./paragraphOfTheDay";
import { FragmentComponent } from "./components/FragmentComponent";
import { LetterComponent } from "./components/LetterComponent";
import { SymbolComponent } from "./components/SymbolComponent";
import { GameProvider } from "./providers/GameProvider";
import { useGameContext } from "./contexts/useGameContext";
import { generateRandomAlphabet } from "./utils/generateRandomAlphabet";
import { letterFound } from "./utils/letterFound";
import { createMatchCount$ } from "./createMatchCount$";
import "crumbs-design-system";
import { paragraphOfYesterday } from "./paragraphOfYesterday";

const GameApp: React.FC = () => {
	const { playerCipher, gameHistory } = useGameContext();
	const separatedWords = paragraphOfTheDay.split(" ");
	const words = separatedWords.map((word) => [...word]);
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	const alphabetRandom = useMemo(() => generateRandomAlphabet(), []);
	const [win, setWin] = useState(false);
	const [matchCount, setMatchCount] = useState(0);

	useEffect(() => {
		const matchCount$ = createMatchCount$(playerCipher);
		const matchCountSubscription = matchCount$.subscribe((value) =>
			setMatchCount(value),
		);

		const playerCipherSubscription = playerCipher.playerCipher$.subscribe(
			() => {
				if (
					[...paragraphOfTheDay].every((letter) =>
						letterFound(letter, playerCipher),
					)
				) {
					setWin(true);

					// Save the game session to history
					const today = new Date().toISOString().split("T")[0];
					const lettersFound = Array.from(
						playerCipher.getPlayerCipher().keys(),
					);
					gameHistory.setSession(today, lettersFound);

					if (window.opener?.registerScore) {
						window.opener.registerScore("deciphraze", matchCount);
						window.close();
					}
				}
			},
		);

		return () => {
			matchCountSubscription.unsubscribe();
			playerCipherSubscription.unsubscribe();
		};
	}, [matchCount, playerCipher, gameHistory.setSession]);

	const share = () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = `0${date.getMonth() + 1}`.slice(-2);
		const day = `0${date.getDate()}`.slice(-2);
		const formattedDate = `${year}/${month}/${day}`;
		let text = `Deciphraze ${formattedDate} - Puzzle réussi avec ${matchCount} associations de lettres.`;

		text += `\n\nhttps://ferdodo.github.io/deciphraze`;
		navigator.clipboard.writeText(text);
	};

	return (
		<crumbs-panel panel-title="Deciphraze">
			<div className="playground">
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
			</div>

			{win && (
				<div>
					<crumbs-p style={{ textAlign: "center" }}>
						🎉 C'est gagné pour aujourd'hui ! 🥳 <br />
						<crumbs-button
							title="Copier dans le presse-papier"
							onClick={share}
							role="button"
						>
							{" "}
							Partager{" "}
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

const container = document.body;
const root = createRoot(container);
root.render(<App />);
