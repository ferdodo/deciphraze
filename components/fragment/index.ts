import { render } from "./template";
import { ref, defineComponent } from "vue";
import { Cell, CellType } from "../cell";
import { playerCipher$ } from "../../playerCipher";
import { normalizeWord } from "../../normalizeWord";

export const FragmentComponent = defineComponent({
	components: {
		Cell
	},
	props: {
		character: String
	},
	setup(props) {
		const character = props.character;
	
		if (character === undefined) {
			throw new Error("Character not found !");
		}

		const processedCharacter = ref(character);
		const cellType = ref(CellType.Symbol);

		playerCipher$.subscribe(function(playerCipher) {
			processedCharacter.value = character;
			cellType.value = CellType.Symbol;

			for (const [key, value] of playerCipher.entries()) {
				if (normalizeWord(character).toUpperCase() === normalizeWord(value).toUpperCase()) {
					processedCharacter.value = normalizeWord(key).toUpperCase();
					cellType.value = CellType.Letter;
				}
			}
		});
	
		return {
			cellType,
			character: processedCharacter
		};
	},
	render
});
