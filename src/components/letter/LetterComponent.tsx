import React, { useState, useEffect } from "react";
import { Cell } from "../cell/Cell";
import { CellType } from "../cell/CellType";
import { useGameContext } from "../../contexts/useGameContext";
import { normalizeWord } from "../../normalizeWord";
import { isAlphabetic } from "../../isAlphabetic";
import { characterEquals } from "../../characterEquals";

interface LetterComponentProps {
	character: string;
}

export const LetterComponent: React.FC<LetterComponentProps> = ({
	character,
}) => {
	const {
		playerCipher: playerCipherService,
		letterSelection,
		symbolSelection,
	} = useGameContext();
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
		const playerCipherSubscription =
			playerCipherService.playerCipher$.subscribe(function (
				value: Map<string, string>,
			) {
				setPlayerCipher(value);
				setHighlighted(value.has(normalizeWord(character).toUpperCase()));
			});

		const letterSelectionSubscription =
			letterSelection.letterSelection$.subscribe(function (
				value: string | null,
			) {
				setLetterSelected(value);

				if (value !== null) {
					setSelected(characterEquals(value, character));
				} else {
					setSelected(false);
				}
			});

		const symbolSelectionSubscription =
			symbolSelection.symbolSelection$.subscribe(function (
				value: string | null,
			) {
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
			});

		return () => {
			playerCipherSubscription.unsubscribe();
			letterSelectionSubscription.unsubscribe();
			symbolSelectionSubscription.unsubscribe();
		};
	}, [character, playerCipher]);

	const cellType = CellType.Letter;

	const clickSelectLetter = () => {
		if (letterSelected === normalizeWord(character).toUpperCase()) {
			playerCipherService.removePlayerCipherEntryByLetter(letterSelected);
			letterSelection.selectLetter(null);
		} else if (isAlphabetic(character)) {
			letterSelection.selectLetter(normalizeWord(character));

			if (symbolSelected) {
				symbolSelection.selectSymbol(null);
				letterSelection.selectLetter(null);
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
