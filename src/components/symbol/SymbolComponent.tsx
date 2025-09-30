import React, { useState, useEffect } from "react";
import { Cell } from "../cell/Cell";
import { CellType } from "../cell/CellType";
import { symbolSelection } from "../../symbolSelection";
import { letterSelection } from "../../letterSelection";
import { normalizeWord } from "../../normalizeWord";
import { isAlphabetic } from "../../isAlphabetic";
import { playerCipher as playerCipherService } from "../../playerCipher";
import { characterEquals } from "../../characterEquals";

interface SymbolComponentProps {
	character: string;
}

export const SymbolComponent: React.FC<SymbolComponentProps> = ({
	character,
}) => {
	const [selected, setSelected] = useState(false);
	const [highlighted, setHighlighted] = useState(false);
	const [matched, setMatched] = useState(false);
	const [playerCipher, setPlayerCipher] = useState<Map<string, string>>(
		new Map(),
	);
	const [symbolSelected, setSymbolSelected] = useState<string | null>(null);
	const [letterSelected, setLetterSelected] = useState<string | null>(null);

	const cellType = CellType.Symbol;

	useEffect(() => {
		const playerCipherSubscription =
			playerCipherService.playerCipher$.subscribe(function (
				value: Map<string, string>,
			) {
				setPlayerCipher(value);
				setHighlighted(
					[...value.values()].includes(normalizeWord(character).toUpperCase()),
				);
			});

		const symbolSelectionSubscription =
			symbolSelection.symbolSelection$.subscribe(function (
				value: string | null,
			) {
				setSymbolSelected(value);

				if (value !== null) {
					setSelected(characterEquals(value, character));
				} else {
					setSelected(false);
				}
			});

		const letterSelectionSubscription =
			letterSelection.letterSelection$.subscribe(function (
				value: string | null,
			) {
				setLetterSelected(value);

				if (value !== null) {
					const decodedChar = playerCipher.get(value);

					if (
						decodedChar !== undefined &&
						characterEquals(decodedChar, character)
					) {
						setMatched(true);
					} else {
						setMatched(false);
					}
				} else {
					setMatched(false);
				}
			});

		return () => {
			playerCipherSubscription.unsubscribe();
			symbolSelectionSubscription.unsubscribe();
			letterSelectionSubscription.unsubscribe();
		};
	}, [character, playerCipher]);

	const clickSelectSymbol = () => {
		if (symbolSelected === normalizeWord(character).toUpperCase()) {
			symbolSelection.selectSymbol(null);
			playerCipherService.removePlayerCipherEntryByValue(character);
		} else if (isAlphabetic(character)) {
			symbolSelection.selectSymbol(normalizeWord(character));

			if (letterSelected) {
				symbolSelection.selectSymbol(null);
				letterSelection.selectLetter(null);
			}
		}
	};

	return (
		<div
			style={{ display: "inline-block" }}
			className="inputs"
			onClick={clickSelectSymbol}
		>
			<Cell
				type={cellType}
				character={character}
				selected={selected}
				highlighted={highlighted}
				matched={matched}
			/>
		</div>
	);
};
