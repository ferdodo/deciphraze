export function scheduleActionUntilCompleted(
	progress: number,
	total: number,
	schedule: (callback: () => void) => number,
	action: () => void,
): number {
	if (progress < total) {
		return schedule(action);
	}
	return 0;
}
