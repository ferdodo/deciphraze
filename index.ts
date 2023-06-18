import { createApp, ref } from "vue";
import { render } from "./template";
import { paragraphOfTheDay } from "./paragraphOfTheDay";
import { FragmentComponent } from "./components/fragment";
import { LetterComponent } from "./components/letter";
import { SymbolComponent } from "./components/symbol";
import { playerCipher$ } from "./playerCipher";
import { generateRandomAlphabet } from "./generateRandomAlphabet";
import { letterFound } from "./letterFound";
import "cookies-ds";

console.log(paragraphOfTheDay);

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

		playerCipher$.subscribe(function() {
			if ([...paragraphOfTheDay].every(letterFound)) {
				win.value = true
			}
		});

		function share() {
			const date = new Date();
			const year = date.getFullYear();
			const month = ('0' + (date.getMonth() + 1)).slice(-2);
			const day = ('0' + date.getDate()).slice(-2);
			const formattedDate = `${year}/${month}/${day}`;
			let text = `Deciphraze ${formattedDate}`;

			text += `\n\nhttps://ferdodo.github.io/deciphraze`;
			navigator.clipboard.writeText(text);
		}

		return {
			words,
			alphabet,
			alphabetRandom,
			win,
			share
		};
	},
	render
});

app.mount("body");
