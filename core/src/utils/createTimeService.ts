import { Temporal } from "temporal-polyfill";
import type { TimeService } from "../services/TimeService";

interface CreateTimeServiceOptions {
	currentInstant?: Temporal.Instant;
	timeZone?: string;
}

interface CreateTimeServiceResult {
	advanceTimeMS(milliseconds: number): void;
	timeService: TimeService;
}

interface ScheduledTask {
	callback: () => void;
	executeAtInMilliseconds: number;
	intervalInMilliseconds: number | null;
	taskId: number;
}

function areSameRealDay(left: Temporal.PlainDate, right: Temporal.PlainDate): boolean {
	return Temporal.PlainDate.compare(left, right) === 0;
}

function getNextScheduledTask(
	scheduledTasks: Map<number, ScheduledTask>,
	targetTimestampInMilliseconds: number,
): ScheduledTask | null {
	let nextScheduledTask: ScheduledTask | null = null;

	scheduledTasks.forEach((scheduledTask) => {
		if (scheduledTask.executeAtInMilliseconds > targetTimestampInMilliseconds) {
			return;
		}

		if (
			nextScheduledTask === null ||
			scheduledTask.executeAtInMilliseconds < nextScheduledTask.executeAtInMilliseconds
		) {
			nextScheduledTask = scheduledTask;
		}
	});

	return nextScheduledTask;
}

function getRealDayFromInstant(
	currentInstant: Temporal.Instant,
	timeZone: string,
): Temporal.PlainDate {
	return currentInstant.toZonedDateTimeISO(timeZone).toPlainDate();
}

export function createTimeService(options: CreateTimeServiceOptions = {}): CreateTimeServiceResult {
	const listeners = new Set<(realDay: Temporal.PlainDate) => void>();
	const scheduledTasks = new Map<number, ScheduledTask>();
	const timeZone = options.timeZone ?? Temporal.Now.timeZoneId();
	let currentInstant = options.currentInstant ?? Temporal.Now.instant();
	let currentRealDay = getRealDayFromInstant(currentInstant, timeZone);
	let nextTaskId = 0;

	function getRealDay(): Temporal.PlainDate {
		return getRealDayFromInstant(currentInstant, timeZone);
	}

	function emitRealDayIfChanged(): void {
		const nextRealDay = getRealDay();

		if (areSameRealDay(nextRealDay, currentRealDay)) {
			return;
		}

		currentRealDay = nextRealDay;
		listeners.forEach((listener) => {
			listener(currentRealDay);
		});
	}

	function scheduleTask(callback: () => void, delayInMilliseconds: number, intervalInMilliseconds: number | null): () => void {
		const taskId = nextTaskId;
		const effectiveDelayInMilliseconds = Math.max(delayInMilliseconds, 0);
		nextTaskId += 1;

		scheduledTasks.set(taskId, {
			callback,
			executeAtInMilliseconds: currentInstant.epochMilliseconds + effectiveDelayInMilliseconds,
			intervalInMilliseconds,
			taskId,
		});

		return () => {
			scheduledTasks.delete(taskId);
		};
	}

	function advanceTimeMS(milliseconds: number): void {
		if (milliseconds < 0) {
			throw new RangeError("advanceTimeMS only supports non-negative values.");
		}

		const targetTimestampInMilliseconds = currentInstant.epochMilliseconds + milliseconds;

		while (true) {
			const nextScheduledTask = getNextScheduledTask(scheduledTasks, targetTimestampInMilliseconds);

			if (nextScheduledTask === null) {
				break;
			}

			currentInstant = Temporal.Instant.fromEpochMilliseconds(nextScheduledTask.executeAtInMilliseconds);
			emitRealDayIfChanged();
			nextScheduledTask.callback();

			if (!scheduledTasks.has(nextScheduledTask.taskId)) {
				continue;
			}

			if (nextScheduledTask.intervalInMilliseconds === null) {
				scheduledTasks.delete(nextScheduledTask.taskId);
				continue;
			}

			nextScheduledTask.executeAtInMilliseconds += nextScheduledTask.intervalInMilliseconds;
		}

		currentInstant = Temporal.Instant.fromEpochMilliseconds(targetTimestampInMilliseconds);
		emitRealDayIfChanged();
	}

	function observeRealDay(listener: (realDay: Temporal.PlainDate) => void): () => void {
		listeners.add(listener);
		listener(currentRealDay);

		return () => {
			listeners.delete(listener);
		};
	}

	return {
		advanceTimeMS,
		timeService: {
			getRealDay,
			observeRealDay,
			setInterval(callback: () => void, delayInMilliseconds: number): () => void {
				return scheduleTask(callback, Math.max(delayInMilliseconds, 1), Math.max(delayInMilliseconds, 1));
			},
			setTimeout(callback: () => void, delayInMilliseconds: number): () => void {
				return scheduleTask(callback, delayInMilliseconds, null);
			},
		},
	};
}
