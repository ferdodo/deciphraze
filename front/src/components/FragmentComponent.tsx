import { DeciFragment } from "@deciphraze/ui";
import { useCellMatchesCurrentSelection } from "../hooks/useCellMatchesCurrentSelection";
import { computeCellType } from "../utils/computeCellType";
import { usePlayerCipher } from "../hooks/usePlayerCipher";
import { useDisplayedFragmentCharacter } from "../hooks/useDisplayedFragmentCharacter";
import { useWin } from "../hooks/useWin";

interface FragmentComponentProps {
	character: string;
}

import type React from "react";

export function FragmentComponent({ character }: FragmentComponentProps): React.JSX.Element {
	const playerCipher = usePlayerCipher();
	const isWin = useWin();
	const cellType = computeCellType(character, playerCipher, isWin);
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
