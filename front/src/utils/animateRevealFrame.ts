import { computeNextRevealIndex } from "./computeNextRevealIndex";

const DELAY_FRAMES = 60;

interface RevealState {
	count: number;
	frameCount: number;
	input: string;
	onCount: (count: number) => void;
}

export function animateRevealFrame(state: RevealState, scheduleNextFrame: () => void): void {
	state.frameCount++;
	if (state.frameCount > DELAY_FRAMES) {
		state.count = computeNextRevealIndex(state.input, state.count);
		state.onCount(state.count);
	}
	scheduleNextFrame();
}
