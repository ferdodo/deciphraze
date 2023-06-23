import { render } from "./template";
import { ref, defineComponent/*, PropType*/ } from "vue";
import { Cell, CellType } from "../cell";
import { letterSelection$, selectLetter$ } from "../../letterSelection";
import { symbolSelection$, selectSymbol$ } from "../../symbolSelection";
import { normalizeWord } from "../../normalizeWord";
import { isAlphabetic } from "../../isAlphabetic";
import { playerCipher$, removePlayerCipherEntryByLetter } from "../../playerCipher";
import { characterEquals } from "../../characterEquals";

export const LetterComponent = defineComponent({
	components: {
		Cell
	},
	props: {
		character: { 
			type: String,
			required: true
		}
	},
	setup({ character }) {
		const selected = ref(false);
		const matched = ref(false);
		const highlighted = ref(false);
		let playerCipher: Map<string, string> = new Map();
		let letterSelected: string | null = null;
		let symbolSelected: string | null = null;

		if (character === undefined) {
			throw new Error("Character not found !");
		}

		playerCipher$.subscribe(function(value) {
			playerCipher = value;
			highlighted.value = playerCipher.has(normalizeWord(character).toUpperCase());
		});

		letterSelection$.subscribe(function(value) {
			letterSelected = value;
		
			if (letterSelected !== null) {
				selected.value = characterEquals(letterSelected, character);
			} else {
				selected.value = false;
			}
		});

		symbolSelection$.subscribe(function(value) {
			symbolSelected = value;
		
			if (symbolSelected !== null) {
				matched.value = false;
			
				for (const [initialChar, decodedChar] of playerCipher.entries()) {
					if (characterEquals(initialChar, character) && characterEquals(decodedChar, symbolSelected)) {
						matched.value = true;
						break;
					}
				}
			} else {
				matched.value = false;
			}
		});

		const cellType = CellType.Letter;

		function selectLetter() {
			if (letterSelected === normalizeWord(character).toUpperCase()) {
				removePlayerCipherEntryByLetter(letterSelected);
				selectLetter$.next(null);
			} else if (isAlphabetic(character)) {
				selectLetter$.next(normalizeWord(character));

				if (symbolSelected) {
					selectSymbol$.next(null);
					selectLetter$.next(null);
				}
			}
		}
	
		return {
			cellType,
			character,
			selected,
			selectLetter,
			highlighted,
			matched
		};
	},
	render
});
