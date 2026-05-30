import { useState, useEffect } from "react";
import { startRevealAnimation } from "../utils/startRevealAnimation";

interface UnrevealedWord {
	id: number;
	length: number;
}

interface RevealResult {
	paragraphReveal: string;
	unrevealedWords: UnrevealedWord[];
}

export function useRevealString(input: string): RevealResult {
	const [revealedCount, setRevealedCount] = useState(0);

	useEffect(() => {
		setRevealedCount(0);
		return startRevealAnimation(input, setRevealedCount, requestAnimationFrame, cancelAnimationFrame);
	}, [input]);

	const paragraphReveal = input.slice(0, revealedCount);

	const remaining = input.slice(revealedCount);
	const nextSpaceIdx = remaining.indexOf(" ");
	const unrevealedStart = nextSpaceIdx === -1 ? remaining.length : nextSpaceIdx + 1;
	let offset = revealedCount + unrevealedStart;
	const unrevealedWords: UnrevealedWord[] = remaining
		.slice(unrevealedStart)
		.split(" ")
		.filter((w) => w.length > 0)
		.map((w) => {
			const item: UnrevealedWord = { id: offset, length: w.length };
			offset += w.length + 1;
			return item;
		});

	return { paragraphReveal, unrevealedWords };
}


