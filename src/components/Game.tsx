import type React from "react";
import { useMemo } from "react";
import { FragmentComponent } from "./FragmentComponent";
import { LetterComponent } from "./LetterComponent";
import { SymbolComponent } from "./SymbolComponent";
import { AchievementsComponent } from "./AchievementsComponent";
import { StatisticsComponent } from "./StatisticsComponent";
import { generateRandomAlphabet } from "../utils/generateRandomAlphabet";
import { useMatchCount } from "../hooks/useMatchCount";
import { useWin } from "../hooks/useWin";
import { useDay } from "../hooks/useDay";
import { useGameContext } from "../hooks/useGameContext";
import { useParagraphOfYesterday } from "../hooks/useParagraphOfYesterday";
import { useParagraphOfTheDay } from "../hooks/useParagraphOfTheDay";
import { share } from "../utils/share";
import { incrementDay } from "../usecases/incrementDay";
import { decrementDay } from "../usecases/decrementDay";

const Game: React.FC = () => {
	const paragraphOfTheDay = useParagraphOfTheDay();
	const separatedWords = paragraphOfTheDay.split(" ");
	const words = separatedWords.map((word) => [...word]);
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	const currentDay = useDay();
	const context = useGameContext();

	const alphabetRandom = useMemo(() => {
		const CHEAT_MODE = true;
		return generateRandomAlphabet(currentDay, CHEAT_MODE);
	}, [currentDay]);

	const win = useWin();
	const matchCount = useMatchCount();
	const paragraphOfYesterday = useParagraphOfYesterday();

	const handleShare = (): void => {
		share(matchCount);
	};

	const handleIncrementDay = (): void => {
		incrementDay(context);
	};

	const handleDecrementDay = (): void => {
		decrementDay(context);
	};

	return (
		<div style={{display: "grid", height: "100svh"}}>
		<crumbs-nav style={{ flexGrow: "1" }}>
			<crumbs-p slot="title-1">Jouer</crumbs-p>
			<crumbs-panel slot="content-1" panel-title="Deciphraze" style={{ maxHeight: "calc(100vh - 14.5rem)" }}>
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

				{!win && (
					<>
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
					</>
				)}

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

			<crumbs-p slot="title-2">Solution d'hier</crumbs-p>
			<crumbs-panel slot="content-2" panel-title="Solution d'hier" style={{ maxHeight: "calc(100vh - 14.5rem)"}}>
				<crumbs-p>
					{paragraphOfYesterday}
				</crumbs-p>
			</crumbs-panel>

			<crumbs-p slot="title-3">Succès</crumbs-p>
			<crumbs-panel slot="content-3" panel-title="Succès" style={{ maxHeight: "calc(100vh - 14.5rem)"}}>
				<AchievementsComponent />
			</crumbs-panel>

			<crumbs-p slot="title-4">Statistiques</crumbs-p>
			<crumbs-panel slot="content-4" panel-title="Statistiques" style={{ maxHeight: "calc(100vh - 14.5rem)"}}>
				<StatisticsComponent />
			</crumbs-panel>

			<crumbs-p slot="title-5">Développement</crumbs-p>
			<crumbs-panel slot="content-5" panel-title="Développement" style={{ maxHeight: "calc(100vh - 14.5rem)"}}>
				<crumbs-p>
					Date actuelle : {currentDay}
				</crumbs-p>
				<br />
				<div style={{ display: "flex", gap: "1rem" }}>
					<crumbs-button
						title="Jour précédent"
						onClick={handleDecrementDay}
						role="button"
					>
						← Jour précédent
					</crumbs-button>
					<crumbs-button
						title="Jour suivant"
						onClick={handleIncrementDay}
						role="button"
					>
						Jour suivant →
					</crumbs-button>
				</div>
			</crumbs-panel>
		</crumbs-nav>
		</div>
	);
};

export { Game };
