import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { useGameContext } from "../contexts/useGameContext";
import { selectLetter } from "../usecases/selectLetter";
import { normalizeWord } from "../utils/normalizeWord";
import { characterEquals } from "../utils/characterEquals";

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
			playerCipherService.playerCipher$.subscribe(
				(value: Map<string, string>) => {
					setPlayerCipher(value);
					setHighlighted(value.has(normalizedCharacter));
				},
			);

		const letterSelectionSubscription =
			letterSelection.letterSelection$.subscribe((value: string | null) => {
				if (value !== null) {
					setSelected(characterEquals(value, character));
				} else {
					setSelected(false);
				}
			});

		const symbolSelectionSubscription =
			symbolSelection.symbolSelection$.subscribe((value: string | null) => {
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
		playerCipher.entries,
	]);

	const clickSelectLetter = () => {
		selectLetter(
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
			onClick={clickSelectLetter}
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
					className={`${selected ? "selected" : ""} ${highlighted ? "highlighted" : ""} ${matched ? "matched" : ""}`}
				>
					{character}
				</span>
			</div>
		</button>
	);
};
