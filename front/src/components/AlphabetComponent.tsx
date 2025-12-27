import { LetterComponent } from "./LetterComponent";

export function AlphabetComponent(): JSX.Element {
	const alphabetArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

	return (
		<>
			{alphabetArray.map((l) => (
				<LetterComponent key={l} character={l} />
			))}
		</>
	);
};

