import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { paragraphOfTheDay } from "./paragraphOfTheDay";
import { FragmentComponent } from "./components/fragment";
import { LetterComponent } from "./components/letter";
import { SymbolComponent } from "./components/symbol";
import { playerCipher$ } from "./playerCipher";
import { generateRandomAlphabet } from "./generateRandomAlphabet";
import { letterFound } from "./letterFound";
import { matchCount$ } from "./matchCount";
import "cookies-ds";
import { paragraphOfYesterday } from "./paragraphOfYesterday";

const App: React.FC = () => {
	const separatedWords = paragraphOfTheDay.split(" ");
	const words = separatedWords.map((word) => [...word]);
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	const alphabetRandom = generateRandomAlphabet();
	const [win, setWin] = useState(false);
	const [matchCount, setMatchCount] = useState(0);

	useEffect(() => {
		const matchCountSubscription = matchCount$.subscribe((value) =>
			setMatchCount(value),
		);

		const playerCipherSubscription = playerCipher$.subscribe(function () {
			if ([...paragraphOfTheDay].every(letterFound)) {
				setWin(true);

				//@ts-ignore
				if (window.opener?.registerScore) {
					//@ts-ignore
					window.opener.registerScore("deciphraze", matchCount);
					window.close();
				}
			}
		});

		return () => {
			matchCountSubscription.unsubscribe();
			playerCipherSubscription.unsubscribe();
		};
	}, [matchCount]);

	const share = () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = ("0" + (date.getMonth() + 1)).slice(-2);
		const day = ("0" + date.getDate()).slice(-2);
		const formattedDate = `${year}/${month}/${day}`;
		let text = `Deciphraze ${formattedDate} - Puzzle réussi avec ${matchCount} associations de lettres.`;

		text += `\n\nhttps://ferdodo.github.io/deciphraze`;
		navigator.clipboard.writeText(text);
	};

	return (
		<cookies-panel>
			<cookies-h1> Deciphraze </cookies-h1>

			<div className="playground">
				<cookies-p>
					Déchiffrez le paragraphe suivant en associant les lettres aux bons
					symboles.
				</cookies-p>

				{words.map((word, wordIndex) => (
					<div
						key={wordIndex}
						style={{ display: "inline-block", marginRight: "0.9rem" }}
					>
						{word.map((f, fragmentIndex) => (
							<FragmentComponent
								key={`${wordIndex}-${fragmentIndex}`}
								character={f}
							/>
						))}
					</div>
				))}

				<br />
				<br />

				<div>
					{alphabet.map((l, index) => (
						<LetterComponent key={index} character={l} />
					))}
				</div>

				<br />

				<div>
					{alphabetRandom.map((l, index) => (
						<SymbolComponent key={index} character={l} />
					))}
				</div>

				<cookies-p>
					<details style={{ marginTop: "5rem" }}>
						<summary> Solution d'hier </summary>
						{paragraphOfYesterday}
					</details>
				</cookies-p>
			</div>

			{win && (
				<div>
					<cookies-p style={{ textAlign: "center" }}>
						🎉 C'est gagné pour aujourd'hui ! 🥳 <br />
						<cookies-button
							title="Copier dans le presse-papier"
							onClick={share}
						>
							{" "}
							Partager{" "}
						</cookies-button>
					</cookies-p>
				</div>
			)}
		</cookies-panel>
	);
};

const container = document.body;
const root = createRoot(container);
root.render(<App />);

