import type React from "react";
import { useState, useEffect } from "react";
import { CellType } from "../../types/CellType";
import { normalizeWord } from "../../normalizeWord";
import { characterEquals } from "../../characterEquals";
import { createLetterSelection } from "../../createLetterSelection";
import { createPlayerCipher } from "../../createPlayerCipher";
import { createSymbolSelection } from "../../createSymbolSelection";

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
	const [cellType, setCellType] = useState(CellType.Symbol);
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
				setCellType(CellType.Symbol);

				for (const [key, decodedValue] of value.entries()) {
					if (characterEquals(character, decodedValue)) {
						setProcessedCharacter(normalizeWord(key).toUpperCase());
						setCellType(CellType.Letter);
					}
				}
			},
		);

		const letterSelectionSubscription = letterSelection.letterSelection$.subscribe(
			(letterSelected: string | null) => {
				if (cellType === CellType.Letter) {
					if (letterSelected !== null) {
						setMatched(characterEquals(processedCharacter, letterSelected));
					} else {
						setMatched(false);
					}
				}
			},
		);

		const symbolSelectionSubscription = symbolSelection.symbolSelection$.subscribe(
			(symbolSelected: string | null) => {
				if (cellType === CellType.Symbol) {
					if (symbolSelected !== null) {
						setMatched(characterEquals(character, symbolSelected));
					} else {
						setMatched(false);
					}
				} else if (cellType === CellType.Letter) {
					if (symbolSelected !== null) {
						setMatched(false);

						for (const [initialChar, decodedChar] of playerCipherMap.entries()) {
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
		if (cellType === CellType.Letter) {
			letterSelection.selectLetter(processedCharacter);
		} else if (cellType === CellType.Symbol) {
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