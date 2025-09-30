import React, { useState, useEffect } from "react";
import { Cell, CellType } from "../cell";
import { letterSelection$, selectLetter } from "../../letterSelection";
import { symbolSelection$, selectSymbol } from "../../symbolSelection";
import { normalizeWord } from "../../normalizeWord";
import { isAlphabetic } from "../../isAlphabetic";
import {
	playerCipher$,
	removePlayerCipherEntryByLetter,
} from "../../playerCipher";
import { characterEquals } from "../../characterEquals";

interface LetterComponentProps {
	character: string;
}

export const LetterComponent: React.FC<LetterComponentProps> = ({
	character,
}) => {
	const [selected, setSelected] = useState(false);
	const [matched, setMatched] = useState(false);
	const [highlighted, setHighlighted] = useState(false);
	const [playerCipher, setPlayerCipher] = useState<Map<string, string>>(
		new Map(),
	);
	const [letterSelected, setLetterSelected] = useState<string | null>(null);
	const [symbolSelected, setSymbolSelected] = useState<string | null>(null);

	if (character === undefined) {
		throw new Error("Character not found !");
	}

	useEffect(() => {
		const playerCipherSubscription = playerCipher$.subscribe(function (value) {
			setPlayerCipher(value);
			setHighlighted(value.has(normalizeWord(character).toUpperCase()));
		});

		const letterSelectionSubscription = letterSelection$.subscribe(
			function (value) {
				setLetterSelected(value);

				if (value !== null) {
					setSelected(characterEquals(value, character));
				} else {
					setSelected(false);
				}
			},
		);

		const symbolSelectionSubscription = symbolSelection$.subscribe(
			function (value) {
				setSymbolSelected(value);

				if (value !== null) {
					setMatched(false);

					for (const [initialChar, decodedChar] of playerCipher.entries()) {
						if (
							characterEquals(initialChar, character) &&
							characterEquals(decodedChar, value)
						) {
							setMatched(true);
							break;
						}
					}
				} else {
					setMatched(false);
				}
			},
		);

		return () => {
			playerCipherSubscription.unsubscribe();
			letterSelectionSubscription.unsubscribe();
			symbolSelectionSubscription.unsubscribe();
		};
	}, [character, playerCipher]);

	const cellType = CellType.Letter;

	const clickSelectLetter = () => {
		if (letterSelected === normalizeWord(character).toUpperCase()) {
			removePlayerCipherEntryByLetter(letterSelected);
			selectLetter(null);
		} else if (isAlphabetic(character)) {
			selectLetter(normalizeWord(character));

			if (symbolSelected) {
				selectSymbol(null);
				selectLetter(null);
			}
		}
	};

	return (
		<div
			style={{ display: "inline-block" }}
			className="inputs"
			onClick={clickSelectLetter}
		>
			<Cell
				selected={selected}
				highlighted={highlighted}
				type={cellType}
				character={character}
				matched={matched}
			/>
		</div>
	);
};

