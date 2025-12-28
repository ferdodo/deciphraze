import { FragmentComponent } from "./FragmentComponent";

interface ParagraphComponentProps {
	words: string[][];
}

export function ParagraphComponent({ words }: ParagraphComponentProps): JSX.Element {
	return (
		<>
			{words.map((word, wordIndex) => (
				<div
					key={`word-${word.join("")}-${wordIndex}`}
					style={{ display: "inline-block", marginRight: "0.9rem" }}
				>
					{word.map((f, fragmentIndex) => (
						<FragmentComponent
							key={`${f}-${word.join("")}-${fragmentIndex}`}
							character={f}
						/>
					))}
				</div>
			))}
		</>
	);
}

