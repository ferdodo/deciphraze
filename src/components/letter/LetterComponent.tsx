import React, { useState, useEffect, useMemo } from "react";
import { Cell } from "../cell/Cell";
import { CellType } from "../cell/CellType";
import { useGameContext } from "../../contexts/useGameContext";
import { selectLetter } from "../../usecases/selectLetter";
import { normalizeWord } from "../../normalizeWord";
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

	if (character === undefined) {
		throw new Error("Character not found !");
	}

	const normalizedCharacter = useMemo(
		() => normalizeWord(character).toUpperCase(),
		[character],
	);

	useEffect(() => {
		const playerCipherSubscription =
			playerCipherService.playerCipher$.subscribe(function (
				value: Map<string, string>,
			) {
				setPlayerCipher(value);
				setHighlighted(value.has(normalizedCharacter));
			});

		const letterSelectionSubscription =
			letterSelection.letterSelection$.subscribe(function (
				value: string | null,
			) {
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
	}, [
		character,
		normalizedCharacter,
		playerCipherService,
		letterSelection,
		symbolSelection,
	]);

	const cellType = CellType.Letter;

	const clickSelectLetter = () => {
		selectLetter(
			character,
			letterSelection,
			symbolSelection,
			playerCipherService,
		);
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
