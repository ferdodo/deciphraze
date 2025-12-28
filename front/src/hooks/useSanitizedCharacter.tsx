import { useState, useEffect } from "react";
import { usePlayerCipher } from "./usePlayerCipher";
import { useWin } from "./useWin";
import { computeSanitizedCharacter } from "../utils/computeSanitizedCharacter";
import { computeCellType } from "../utils/computeCellType";

export const useSanitizedCharacter = (character: string): string => {
	const playerCipher = usePlayerCipher();
	const isWin = useWin();
	const cellType = computeCellType(character, playerCipher, isWin);
	const [sanitizedCharacter, setSanitizedCharacter] = useState(character);

	useEffect(() => {
		const newSanitizedCharacter = computeSanitizedCharacter(character, playerCipher, cellType);
		setSanitizedCharacter(newSanitizedCharacter);
	}, [character, cellType, playerCipher]);

	return sanitizedCharacter;
};
