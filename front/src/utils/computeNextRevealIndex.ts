const WORDS_PER_FRAME = 100;

export function computeNextRevealIndex(input: string, from: number): number {
	const taken = input.slice(from).split(" ").slice(0, WORDS_PER_FRAME).join(" ");
	return Math.min(from + taken.length + 1, input.length);
}
