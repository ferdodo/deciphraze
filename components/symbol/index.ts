import { render } from "./template";
import { defineComponent, ref } from "vue";
import { Cell, CellType } from "../cell";
import { symbolSelection$, selectSymbol$ } from "../../symbolSelection";
import { normalizeWord } from "../../normalizeWord";
import { isAlphabetic } from "../../isAlphabetic";
import { playerCipher$ } from "../../playerCipher";

export const SymbolComponent = defineComponent({
	components: {
		Cell
	},
	props: {
		character: String
	},
	setup(props) {
		const selected = ref(false);
		const highlighted = ref(false);

		if (props.character === undefined) {
			throw new Error("Character not found !");
		}

		const character = props.character;
		const cellType = CellType.Symbol;

		playerCipher$.subscribe(function(playerCipher) {
			highlighted.value = [...playerCipher.values()].includes(normalizeWord(character).toUpperCase());
		});

		symbolSelection$.subscribe(function(symbolSelected) {
			if (symbolSelected !== null) {
				selected.value = normalizeWord(symbolSelected).toUpperCase()
					=== normalizeWord(character).toUpperCase();
			} else {
				selected.value = false;
			}
		});

		function selectSymbol() {
			if (character !== undefined && isAlphabetic(character)) {
				selectSymbol$.next(normalizeWord(character));
			}
		}
	
		return {
			cellType,
			character,
			selected,
			selectSymbol,
			highlighted
		};
	},
	render
});
