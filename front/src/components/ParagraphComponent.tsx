import type React from "react";
import { FragmentComponent } from "./FragmentComponent";

interface ParagraphComponentProps {
	words: string[][];
}

export function ParagraphComponent({ words }: ParagraphComponentProps): React.JSX.Element {
	const wordsWithIds = words.map((word, index) => ({
		word: word.map((f, fragmentIndex) => ({ f, fragmentIndex })),
		id: index,
	}));

	return (
		<>
			{wordsWithIds.map(({ word, id }) => (
				<div
					key={id}
					style={{ display: "inline-block", marginRight: "0.9rem" }}
				>
					{word.map(({ f, fragmentIndex }) => (
						<FragmentComponent
							key={`${id}-${fragmentIndex}`}
							character={f}
						/>
					))}
				</div>
			))}
		</>
	);
}

