import { usePlayerCipher } from "./usePlayerCipher";
import { useSanitizedCharacter } from "./useSanitizedCharacter";
import { useCipher } from "./useCipher";
import { computeCellType } from "../utils/computeCellType";
import { computeDisplayedFragmentCharacter } from "../utils/computeDisplayedFragmentCharacter";

export function useDisplayedFragmentCharacter(character: string): string {
	const playerCipher = usePlayerCipher();
	const cellType = computeCellType(character, playerCipher);
	const sanitizedCharacter = useSanitizedCharacter(character);
	const cipher = useCipher();

	return computeDisplayedFragmentCharacter(
		character,
		cellType,
		sanitizedCharacter,
		cipher
	);
}


