import { DeciFragment } from "@deciphraze/ds";
import { useCellMatchesCurrentSelection } from "../hooks/useCellMatchesCurrentSelection";
import { computeCellType } from "../utils/computeCellType";
import { usePlayerCipher } from "../hooks/usePlayerCipher";
import { useDisplayedFragmentCharacter } from "../hooks/useDisplayedFragmentCharacter";

interface FragmentComponentProps {
	character: string;
}

export function FragmentComponent({ character }: FragmentComponentProps): JSX.Element {
	const playerCipher = usePlayerCipher();
	const cellType = computeCellType(character, playerCipher);
	const matchesCurrentSelection = useCellMatchesCurrentSelection(character);
	const displayCharacter = useDisplayedFragmentCharacter(character);

	return (
		<DeciFragment
			cellType={cellType}
			displayCharacter={displayCharacter}
			matchesCurrentSelection={matchesCurrentSelection}
		/>
	);
};
