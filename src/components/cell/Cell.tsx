import type React from "react";
import { useMemo } from "react";
import { normalizeWord } from "../../normalizeWord";
import { getEncodedCharacter } from "../../getEncodedCharacter";
import { isAlphabetic } from "../../isAlphabetic";
import { CellType } from "./CellType";

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
	if (type === undefined) {
		throw new Error("Type not found !");
	}

	if (character === undefined) {
		throw new Error("Character not found !");
	}

	const processedType = useMemo(() => {
		return isAlphabetic(character) ? type : CellType.Letter;
	}, [character, type]);

	const processedCharacter = useMemo(() => {
		return processedType === CellType.Letter
			? character
			: getEncodedCharacter(normalizeWord(character).toUpperCase());
	}, [processedType, character]);

	return (
		<div
			style={{
				display: "inline-block",
				maxWidth: "4.9rem",
				height: "1rem",
				textAlign: "center",
			}}
		>
			{processedType === CellType.Letter ? (
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
