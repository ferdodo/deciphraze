import { render } from "./template";
import { ref, defineComponent/*, PropType*/ } from "vue";
import { Cell, CellType } from "../cell";
import { letterSelection$, selectLetter$ } from "../../letterSelection";
import { normalizeWord } from "../../normalizeWord";
import { isAlphabetic } from "../../isAlphabetic";
import { playerCipher$ } from "../../playerCipher";

export const LetterComponent = defineComponent({
	components: {
		Cell
	},
	props: {
		character: String
	},
	setup({ character }) {
		const selected = ref(false);
		const highlighted = ref(false);

		if (character === undefined) {
			throw new Error("Character not found !");
		}

		playerCipher$.subscribe(function(playerCipher) {
			highlighted.value = playerCipher.has(normalizeWord(character).toUpperCase());
		});

		letterSelection$.subscribe(function(letterSelected) {
			if (letterSelected !== null) {
				selected.value = normalizeWord(letterSelected).toUpperCase()
					=== normalizeWord(character).toUpperCase();
			} else {
				selected.value = false;
			}
		});

		const cellType = CellType.Letter;

		function selectLetter() {
			if (character !== undefined && isAlphabetic(character)) {
				selectLetter$.next(normalizeWord(character));
			}
		}
	
		return {
			cellType,
			character,
			selected,
			selectLetter,
			highlighted
		};
	},
	render
});
