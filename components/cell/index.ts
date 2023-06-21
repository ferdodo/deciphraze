import { render } from "./template";
import { defineComponent, PropType, toRefs, computed } from "vue";
import { normalizeWord } from "../../normalizeWord";
import { getEncodedCharacter } from "../../getEncodedCharacter";
import { isAlphabetic } from "../../isAlphabetic";

export enum CellType {
	Letter,
	Symbol
}

export const Cell = defineComponent({
	props: {
		type: {
			type: Number as PropType<CellType>,
			required: true
		},
		highlighted: Boolean,
		selected: Boolean,
		character: {
			type: String,
			required: true
		},
		matched: Boolean
	},
	setup(props) {
		const {
			selected,
			highlighted,
			character,
			type,
			matched
		} = toRefs(props);

		if (props.type === undefined) {
			throw new Error("Type not found !");
		}

		if (props.character === undefined) {
			throw new Error("Character not found !");
		}

		const processedType = computed(function() {
			return isAlphabetic(character.value)
				? type.value
				: CellType.Letter;
		});

		const processedCharacter = computed(function() {
			return processedType.value === CellType.Letter
				? character.value
				: getEncodedCharacter(normalizeWord(character.value).toUpperCase())
		})
		
		return {
			processedType,
			CellType,
			selected,
			highlighted,
			processedCharacter,
			matched
		};
	},
	render
});
