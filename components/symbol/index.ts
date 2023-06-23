import { render } from "./template";
import { defineComponent, ref } from "vue";
import { Cell, CellType } from "../cell";
import { symbolSelection$, selectSymbol$ } from "../../symbolSelection";
import { letterSelection$, selectLetter$ } from "../../letterSelection";
import { normalizeWord } from "../../normalizeWord";
import { isAlphabetic } from "../../isAlphabetic";
import { playerCipher$, removePlayerCipherEntryByValue } from "../../playerCipher";
import { characterEquals } from "../../characterEquals";

export const SymbolComponent = defineComponent({
	components: {
		Cell
	},
	props: {
		character: {
			type: String,
			required: true
		}
	},
	setup(props) {
		const selected = ref(false);
		const highlighted = ref(false);
		const matched = ref(false);
		let playerCipher: Map<string, string> = new Map();
		const character = props.character;
		const cellType = CellType.Symbol;
		let symbolSelected: string | null = null;
		let letterSelected: string | null = null;

		playerCipher$.subscribe(function(value) {
			playerCipher = value;
			highlighted.value = [...playerCipher.values()].includes(normalizeWord(character).toUpperCase());
		});

		symbolSelection$.subscribe(function(value) {
			symbolSelected = value;
		
			if (symbolSelected !== null) {
				selected.value = characterEquals(symbolSelected, character);
			} else {
				selected.value = false;
			}
		});

		letterSelection$.subscribe(function(value) {
			letterSelected = value;
		
			if (letterSelected !== null) {
				const decodedChar = playerCipher.get(letterSelected);

				if (decodedChar !== undefined && characterEquals(decodedChar, character)) {
					matched.value = true;
				} else {
					matched.value = false;
				}
			} else {
				matched.value = false;
			}
		});

		function selectSymbol() {
			if (symbolSelected === normalizeWord(character).toUpperCase()) {
				selectSymbol$.next(null);
				removePlayerCipherEntryByValue(character);
			} else if (isAlphabetic(character)) {
				selectSymbol$.next(normalizeWord(character));

				if (letterSelected) {
					selectSymbol$.next(null);
					selectLetter$.next(null);
				}
			}
		}
	
		return {
			cellType,
			character,
			selected,
			selectSymbol,
			highlighted,
			matched
		};
	},
	render
});
