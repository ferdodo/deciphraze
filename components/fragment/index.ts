import { render } from "./template";
import { ref, defineComponent } from "vue";
import { Cell, CellType } from "../cell";
import { playerCipher$ } from "../../playerCipher";
import { normalizeWord } from "../../normalizeWord";
import { letterSelection$ } from "../../letterSelection";
import { symbolSelection$ } from "../../symbolSelection";
import { characterEquals } from "../../characterEquals";

export const FragmentComponent = defineComponent({
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
		const character = props.character;
		const processedCharacter = ref(character);
		const cellType = ref(CellType.Symbol);
		let matched = ref(false);
		let playerCipher: Map<string, string> = new Map();

		playerCipher$.subscribe(function(value) {
			playerCipher = value;
			matched.value = false;
			processedCharacter.value = character;
			cellType.value = CellType.Symbol;

			for (const [key, value] of playerCipher.entries()) {
				if (characterEquals(character, value)) {
					processedCharacter.value = normalizeWord(key).toUpperCase();
					cellType.value = CellType.Letter;
				}
			}
		});

		letterSelection$.subscribe(function(letterSelected) {
			if (cellType.value === CellType.Letter) {
				if (letterSelected !== null) {
					matched.value = characterEquals(processedCharacter.value, letterSelected);
				} else {
					matched.value = false;
				}
			}
		});

		symbolSelection$.subscribe(function(symbolSelected) {
			if (cellType.value === CellType.Symbol) {
				if (symbolSelected !== null) {
					matched.value = characterEquals(character, symbolSelected)
				} else {
					matched.value = false;
				}
			} else if (cellType.value === CellType.Letter) {
				if (symbolSelected !== null) {
					matched.value = false;

					for (const [initialChar, decodedChar] of playerCipher.entries()) {
						if (characterEquals(initialChar, processedCharacter.value) && characterEquals(decodedChar, symbolSelected)) {
							matched.value = true;
							break;
						}
					}				
				} else {
					matched.value = false;
				}
			}
		});

		return {
			cellType,
			character: processedCharacter,
			matched
		};
	},
	render
});
