import { useState, useEffect } from "react";
import { usePlayerCipher } from "./usePlayerCipher";
import { computeSanitizedCharacter } from "../utils/computeSanitizedCharacter";
import { computeCellType } from "../utils/computeCellType";

export const useSanitizedCharacter = (character: string): string => {
	const playerCipher = usePlayerCipher();
	const cellType = computeCellType(character, playerCipher);
	const [sanitizedCharacter, setSanitizedCharacter] = useState(character);

	useEffect(() => {
		const newSanitizedCharacter = computeSanitizedCharacter(character, playerCipher, cellType);
		setSanitizedCharacter(newSanitizedCharacter);
	}, [character, cellType, playerCipher]);

	return sanitizedCharacter;
};
