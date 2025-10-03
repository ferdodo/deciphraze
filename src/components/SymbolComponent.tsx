import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { useGameContext } from "../contexts/useGameContext";
import { selectSymbol } from "../usecases/selectSymbol";
import { normalizeWord } from "../normalizeWord";
import { characterEquals } from "../characterEquals";

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

	const normalizedCharacter = useMemo(
		() => normalizeWord(character).toUpperCase(),
		[character],
	);

	useEffect(() => {
		const playerCipherSubscription =
			playerCipherService.playerCipher$.subscribe((value: Map<string, string>) => {
				setPlayerCipher(value);
				setHighlighted([...value.values()].includes(normalizedCharacter));
			});

		const symbolSelectionSubscription =
			symbolSelection.symbolSelection$.subscribe((value: string | null) => {
				if (value !== null) {
					setSelected(characterEquals(value, character));
				} else {
					setSelected(false);
				}
			});

		const letterSelectionSubscription =
			letterSelection.letterSelection$.subscribe((value: string | null) => {
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
	}, [
		character,
		normalizedCharacter,
		playerCipherService,
		letterSelection,
		symbolSelection,
		playerCipher.get,
	]);

	const clickSelectSymbol = () => {
		selectSymbol(
			character,
			letterSelection,
			symbolSelection,
			playerCipherService,
		);
	};

	return (
		<button
			style={{ display: "inline-block" }}
			className="inputs"
			onClick={clickSelectSymbol}
			type="button"
		>
			<div
				style={{
					display: "inline-block",
					maxWidth: "4.9rem",
					height: "1rem",
					textAlign: "center",
				}}
			>
				<span
					className={`symbols ${selected ? "selected" : ""} ${highlighted ? "highlighted" : ""} ${matched ? "matched" : ""}`}
				>
					{character}
				</span>
			</div>
		</button>
	);
};
