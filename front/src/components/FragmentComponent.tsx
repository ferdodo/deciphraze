import { DeciFragment } from "@deciphraze/ds";
import { useSanitizedCharacter } from "../hooks/useSanitizedCharacter";
import { useCellMatchesCurrentSelection } from "../hooks/useCellMatchesCurrentSelection";
import { computeCellType } from "../utils/computeCellType";
import { usePlayerCipher } from "../hooks/usePlayerCipher";
import { normalizeWord } from "../utils/normalizeWord";
import { useCipher } from "../hooks/useCipher";
import { getEncodedCharacter } from "../utils/getEncodedCharacter";
import { isDev } from "../utils/isDev";

interface FragmentComponentProps {
	character: string;
}

export function FragmentComponent({ character }: FragmentComponentProps): JSX.Element {
	const playerCipher = usePlayerCipher();
	const cellType = computeCellType(character, playerCipher);
	const sanitizedCharacter = useSanitizedCharacter(character);
	const matchesCurrentSelection = useCellMatchesCurrentSelection(character);
	const cipher = useCipher();

	const displayCharacter = cellType === "letter" 
		? sanitizedCharacter
		: isDev()
			? normalizeWord(character).toUpperCase()
			: getEncodedCharacter(character, cipher);

	return (
		<DeciFragment
			character={character}
			cellType={cellType}
			displayCharacter={displayCharacter}
			matchesCurrentSelection={matchesCurrentSelection}
		/>
	);
};
