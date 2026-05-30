import { useCipher } from "./useCipher";
import { getEncodedCharacter } from "../utils/getEncodedCharacter";
import { isDev } from "../utils/isDev";

export function useDisplayedSymbolCharacter(character: string): string {
	const cipher = useCipher();

	if (isDev()) {
		return character.toUpperCase();
	}

	return getEncodedCharacter(character, cipher);
}

