import React, { useState, useEffect } from "react";
import { Cell, CellType } from "../cell";
import { symbolSelection$, selectSymbol } from "../../symbolSelection";
import { letterSelection$, selectLetter } from "../../letterSelection";
import { normalizeWord } from "../../normalizeWord";
import { isAlphabetic } from "../../isAlphabetic";
import {
	playerCipher$,
	removePlayerCipherEntryByValue,
} from "../../playerCipher";
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
		const playerCipherSubscription = playerCipher$.subscribe(function (value) {
			setPlayerCipher(value);
			setHighlighted(
				[...value.values()].includes(normalizeWord(character).toUpperCase()),
			);
		});

		const symbolSelectionSubscription = symbolSelection$.subscribe(
			function (value) {
				setSymbolSelected(value);

				if (value !== null) {
					setSelected(characterEquals(value, character));
				} else {
					setSelected(false);
				}
			},
		);

		const letterSelectionSubscription = letterSelection$.subscribe(
			function (value) {
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
			},
		);

		return () => {
			playerCipherSubscription.unsubscribe();
			symbolSelectionSubscription.unsubscribe();
			letterSelectionSubscription.unsubscribe();
		};
	}, [character, playerCipher]);

	const clickSelectSymbol = () => {
		if (symbolSelected === normalizeWord(character).toUpperCase()) {
			selectSymbol(null);
			removePlayerCipherEntryByValue(character);
		} else if (isAlphabetic(character)) {
			selectSymbol(normalizeWord(character));

			if (letterSelected) {
				selectSymbol(null);
				selectLetter(null);
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

