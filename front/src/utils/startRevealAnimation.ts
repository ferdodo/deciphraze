import { animateRevealFrame } from "./animateRevealFrame";
import { scheduleActionUntilCompleted } from "./scheduleActionUntilCompleted";

interface AnimState {
	count: number;
	frameCount: number;
	rafId: number;
	input: string;
	onCount: (count: number) => void;
}

export function startRevealAnimation(
	input: string,
	onCount: (count: number) => void,
	schedule: (callback: () => void) => number,
	cancelSchedule: (id: number) => void,
): () => void {
	const state: AnimState = { count: 0, frameCount: 0, rafId: 0, input, onCount };

	function step(): void {
		animateRevealFrame(state, () => {
			state.rafId = scheduleActionUntilCompleted(state.count, state.input.length, schedule, step);
		});
	}

	state.rafId = schedule(step);
	return () => cancelSchedule(state.rafId);
}
