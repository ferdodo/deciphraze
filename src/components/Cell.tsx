import type React from "react";
import { useMemo } from "react";
import { normalizeWord } from "../utils/normalizeWord";
import { getEncodedCharacter } from "../utils/getEncodedCharacter";
import { isAlphabetic } from "../utils/isAlphabetic";
import { useGameContext } from "../contexts/useGameContext";
import type { CellType } from "../types/CellType";

interface CellProps {
	type: CellType;
	highlighted?: boolean;
	selected?: boolean;
	character: string;
	matched?: boolean;
}

export const Cell: React.FC<CellProps> = ({
	type,
	highlighted = false,
	selected = false,
	character,
	matched = false,
}) => {
	const { cipherService } = useGameContext();
	if (type === undefined) {
		throw new Error("Type not found !");
	}

	if (character === undefined) {
		throw new Error("Character not found !");
	}

	const processedType = useMemo(() => {
		return isAlphabetic(character) ? type : "letter";
	}, [character, type]);

	const processedCharacter = useMemo(() => {
		return processedType === "letter"
			? character
			: getEncodedCharacter(normalizeWord(character).toUpperCase(), cipherService.getCipher());
	}, [processedType, character, cipherService]);

	return (
		<div
			style={{
				display: "inline-block",
				maxWidth: "4.9rem",
				height: "1rem",
				textAlign: "center",
			}}
		>
			{processedType === "letter" ? (
				<span
					className={`${selected ? "selected" : ""} ${highlighted ? "highlighted" : ""} ${matched ? "matched" : ""}`}
				>
					{processedCharacter}
				</span>
			) : (
				<span
					className={`symbols ${selected ? "selected" : ""} ${highlighted ? "highlighted" : ""} ${matched ? "matched" : ""}`}
				>
					{processedCharacter}
				</span>
			)}
		</div>
	);
};
