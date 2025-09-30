import React, { useState, useEffect } from "react";
import { Cell, CellType } from "../cell";
import { playerCipher$ } from "../../playerCipher";
import { normalizeWord } from "../../normalizeWord";
import { letterSelection$ } from "../../letterSelection";
import { symbolSelection$ } from "../../symbolSelection";
import { characterEquals } from "../../characterEquals";

interface FragmentComponentProps {
	character: string;
}

export const FragmentComponent: React.FC<FragmentComponentProps> = ({
	character,
}) => {
	const [processedCharacter, setProcessedCharacter] = useState(character);
	const [cellType, setCellType] = useState(CellType.Symbol);
	const [matched, setMatched] = useState(false);
	const [playerCipher, setPlayerCipher] = useState<Map<string, string>>(
		new Map(),
	);

	useEffect(() => {
		const playerCipherSubscription = playerCipher$.subscribe(function (value) {
			setPlayerCipher(value);
			setMatched(false);
			setProcessedCharacter(character);
			setCellType(CellType.Symbol);

			for (const [key, decodedValue] of value.entries()) {
				if (characterEquals(character, decodedValue)) {
					setProcessedCharacter(normalizeWord(key).toUpperCase());
					setCellType(CellType.Letter);
				}
			}
		});

		const letterSelectionSubscription = letterSelection$.subscribe(
			function (letterSelected) {
				if (cellType === CellType.Letter) {
					if (letterSelected !== null) {
						setMatched(characterEquals(processedCharacter, letterSelected));
					} else {
						setMatched(false);
					}
				}
			},
		);

		const symbolSelectionSubscription = symbolSelection$.subscribe(
			function (symbolSelected) {
				if (cellType === CellType.Symbol) {
					if (symbolSelected !== null) {
						setMatched(characterEquals(character, symbolSelected));
					} else {
						setMatched(false);
					}
				} else if (cellType === CellType.Letter) {
					if (symbolSelected !== null) {
						setMatched(false);

						for (const [initialChar, decodedChar] of playerCipher.entries()) {
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
	}, [character, cellType, processedCharacter, playerCipher]);

	return (
		<div style={{ display: "inline-block" }} className="fragments">
			<Cell type={cellType} character={processedCharacter} matched={matched} />
		</div>
	);
};
