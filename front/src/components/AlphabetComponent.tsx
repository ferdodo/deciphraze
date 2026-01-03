import type React from "react";
import { LetterComponent } from "./LetterComponent";

export function AlphabetComponent(): React.JSX.Element {
	const alphabetArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

	return (
		<>
			{alphabetArray.map((l) => (
				<LetterComponent key={l} character={l} />
			))}
		</>
	);
};

