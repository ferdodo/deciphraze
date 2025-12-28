import { usePlayerCipher } from "./usePlayerCipher";
import { useSanitizedCharacter } from "./useSanitizedCharacter";
import { useCipher } from "./useCipher";
import { useWin } from "./useWin";
import { computeCellType } from "../utils/computeCellType";
import { computeDisplayedFragmentCharacter } from "../utils/computeDisplayedFragmentCharacter";

export function useDisplayedFragmentCharacter(character: string): string {
	const playerCipher = usePlayerCipher();
	const isWin = useWin();
	const cellType = computeCellType(character, playerCipher, isWin);
	const sanitizedCharacter = useSanitizedCharacter(character);
	const cipher = useCipher();

	return computeDisplayedFragmentCharacter(
		character,
		cellType,
		sanitizedCharacter,
		cipher
	);
}


