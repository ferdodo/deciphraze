import React, { useState, useEffect } from "react";
import { Cell } from "../cell/Cell";
import { CellType } from "../cell/CellType";
import { playerCipher } from "../../playerCipher";
import { normalizeWord } from "../../normalizeWord";
import { letterSelection } from "../../letterSelection";
import { symbolSelection } from "../../symbolSelection";
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
	const [playerCipherMap, setPlayerCipherMap] = useState<Map<string, string>>(
		new Map(),
	);

	useEffect(() => {
		const playerCipherSubscription = playerCipher.playerCipher$.subscribe(
			function (value: Map<string, string>) {
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

		const letterSelectionSubscription =
			letterSelection.letterSelection$.subscribe(function (
				letterSelected: string | null,
			) {
				if (cellType === CellType.Letter) {
					if (letterSelected !== null) {
						setMatched(characterEquals(processedCharacter, letterSelected));
					} else {
						setMatched(false);
					}
				}
			});

		const symbolSelectionSubscription =
			symbolSelection.symbolSelection$.subscribe(function (
				symbolSelected: string | null,
			) {
				if (cellType === CellType.Symbol) {
					if (symbolSelected !== null) {
						setMatched(characterEquals(character, symbolSelected));
					} else {
						setMatched(false);
					}
				} else if (cellType === CellType.Letter) {
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
			});

		return () => {
			playerCipherSubscription.unsubscribe();
			letterSelectionSubscription.unsubscribe();
			symbolSelectionSubscription.unsubscribe();
		};
	}, [character, cellType, processedCharacter, playerCipherMap]);

	return (
		<div style={{ display: "inline-block" }} className="fragments">
			<Cell type={cellType} character={processedCharacter} matched={matched} />
		</div>
	);
};
