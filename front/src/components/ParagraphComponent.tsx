import type React from "react";
import { FragmentComponent } from "./FragmentComponent";
import styles from "./ParagraphComponent.module.css";

interface ParagraphComponentProps {
	words: string[][];
	unrevealedWords: Array<{ id: number; length: number }>;
}

const CHAR_WIDTH_PX = 14.9;

export function ParagraphComponent({ words, unrevealedWords }: ParagraphComponentProps): React.JSX.Element {
	const wordsWithIds = words.map((word, index) => ({
		word: word.map((f, fragmentIndex) => ({ f, fragmentIndex })),
		id: index,
	}));

	return (
		<>
			{wordsWithIds.map(({ word, id }) => (
				<div key={id} className={styles.word}>
					{word.map(({ f, fragmentIndex }) => (
						<FragmentComponent
							key={`${id}-${fragmentIndex}`}
							character={f}
						/>
					))}
				</div>
			))}
			{unrevealedWords.map(({ id, length }) => (
				<div
					key={`skeleton-${id}`}
					className={styles.skeleton}
					style={{ width: `${length * CHAR_WIDTH_PX}px` }}
				/>
			))}
		</>
	);
}

