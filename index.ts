import { createApp, ref } from "vue";
import { render } from "./template";
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

const app = createApp({
	components: {
		Fragment: FragmentComponent,
		Letter: LetterComponent,
		SymbolComponent
	},
	setup() {
		const separatedWords = paragraphOfTheDay.split(" ");
		const words = separatedWords.map(word => [...word]);
	 	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
		const alphabetRandom = generateRandomAlphabet();
		const win = ref(false);
		let matchCount = 0;
		matchCount$.subscribe(value => matchCount = value);

		playerCipher$.subscribe(function() {
			if ([...paragraphOfTheDay].every(letterFound)) {
				win.value = true

				//@ts-ignore
				if (window.opener?.registerScore) {
					//@ts-ignore
					window.opener.registerScore("deciphraze", matchCount);
					window.close();
				}
			}
		});

		function share() {
			const date = new Date();
			const year = date.getFullYear();
			const month = ('0' + (date.getMonth() + 1)).slice(-2);
			const day = ('0' + date.getDate()).slice(-2);
			const formattedDate = `${year}/${month}/${day}`;
			let text = `Deciphraze ${formattedDate} - Puzzle réussi avec ${ matchCount } associations de lettres.`;

			text += `\n\nhttps://ferdodo.github.io/deciphraze`;
			navigator.clipboard.writeText(text);
		}

		return {
			words,
			alphabet,
			alphabetRandom,
			win,
			share,
			paragraphOfYesterday
		};
	},
	render
});

app.mount("body");
