import React, { useState, useEffect } from "react";
import { Cell } from "../cell/Cell";
import { CellType } from "../cell/CellType";
import { useGameContext } from "../../contexts/useGameContext";
import { selectSymbol } from "../../usecases/selectSymbol";
import { normalizeWord } from "../../normalizeWord";
import { characterEquals } from "../../characterEquals";

interface SymbolComponentProps {
	character: string;
}

export const SymbolComponent: React.FC<SymbolComponentProps> = ({
	character,
}) => {
	const {
		playerCipher: playerCipherService,
		letterSelection,
		symbolSelection,
	} = useGameContext();
	const [selected, setSelected] = useState(false);
	const [highlighted, setHighlighted] = useState(false);
	const [matched, setMatched] = useState(false);
	const [playerCipher, setPlayerCipher] = useState<Map<string, string>>(
		new Map(),
	);

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
		selectSymbol(
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
