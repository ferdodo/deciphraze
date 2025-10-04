import type React from "react";
import { useState, useEffect } from "react";
import type { CellType } from "../types/CellType";
import { normalizeWord } from "../utils/normalizeWord";
import { characterEquals } from "../utils/characterEquals";
import { createLetterSelection } from "../createLetterSelection";
import { createPlayerCipher } from "../createPlayerCipher";
import { createSymbolSelection } from "../createSymbolSelection";

const letterSelection = createLetterSelection();
const playerCipher = createPlayerCipher();
const symbolSelection = createSymbolSelection();

interface FragmentComponentProps {
	character: string;
}

export const FragmentComponent: React.FC<FragmentComponentProps> = ({
	character,
}) => {
	const [processedCharacter, setProcessedCharacter] = useState(character);
	const [cellType, setCellType] = useState<CellType>("symbol");
	const [matched, setMatched] = useState(false);
	const [playerCipherMap, setPlayerCipherMap] = useState<Map<string, string>>(
		new Map(),
	);

	useEffect(() => {
		const playerCipherSubscription = playerCipher.playerCipher$.subscribe(
			(value: Map<string, string>) => {
				setPlayerCipherMap(value);
				setMatched(false);
				setProcessedCharacter(character);
				setCellType("symbol");

				for (const [key, decodedValue] of value.entries()) {
					if (characterEquals(character, decodedValue)) {
						setProcessedCharacter(normalizeWord(key).toUpperCase());
						setCellType("letter");
					}
				}
			},
		);

		const letterSelectionSubscription =
			letterSelection.letterSelection$.subscribe(
				(letterSelected: string | null) => {
					if (cellType === "letter") {
						if (letterSelected !== null) {
							setMatched(characterEquals(processedCharacter, letterSelected));
						} else {
							setMatched(false);
						}
					}
				},
			);

		const symbolSelectionSubscription =
			symbolSelection.symbolSelection$.subscribe(
				(symbolSelected: string | null) => {
					if (cellType === "symbol") {
						if (symbolSelected !== null) {
							setMatched(characterEquals(character, symbolSelected));
						} else {
							setMatched(false);
						}
					} else if (cellType === "letter") {
						if (symbolSelected !== null) {
							setMatched(false);

							for (const [
								initialChar,
								decodedChar,
							] of playerCipherMap.entries()) {
								if (
									characterEquals(initialChar, processedCharacter) &&
									characterEquals(decodedChar, symbolSelected)
								) {
									setMatched(true);
									break;
								}
							}
						} else {
							setMatched(false);
						}
					}
				},
			);

		return () => {
			playerCipherSubscription.unsubscribe();
			letterSelectionSubscription.unsubscribe();
			symbolSelectionSubscription.unsubscribe();
		};
	}, [character, cellType, processedCharacter, playerCipherMap]);

	const clickSelectFragment = () => {
		if (cellType === "letter") {
			letterSelection.selectLetter(processedCharacter);
		} else if (cellType === "symbol") {
			symbolSelection.selectSymbol(character);
		}
	};

	return (
		<button
			style={{ display: "inline-block" }}
			className={`inputs ${matched ? "matched" : ""}`}
			onClick={clickSelectFragment}
			type="button"
		>
			<div className="letter">{processedCharacter}</div>
			<div className="symbol">{character}</div>
		</button>
	);
};
