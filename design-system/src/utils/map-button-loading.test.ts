import { firstValueFrom, of } from "rxjs";
import { expect, test } from "vitest";
import { mapButtonLoading } from "./map-button-loading";

test("Defaults to 0 on unspecified progress", async function () {
	const progress = null;
	const indeterminateProgress = false;

	const source$ = of(<[number | null, boolean]>[
		progress,
		indeterminateProgress
	]);

	const result$ = source$.pipe(mapButtonLoading());
	const result = await firstValueFrom(result$);
	expect(result).toBe(0);
});

test("Should be progress on nominal case", async function () {
	const progress = 25;
	const indeterminateProgress = false;

	const source$ = of(<[number | null, boolean]>[
		progress,
		indeterminateProgress
	]);

	const result$ = source$.pipe(mapButtonLoading());
	const result = await firstValueFrom(result$);
	expect(result).toBe(25);
});

test("Should be 100 on indeterminate progress without ongoing minimal progress", async function () {
	const progress = 50;
	const indeterminateProgress = true;

	const source$ = of(<[number | null, boolean]>[
		progress,
		indeterminateProgress
	]);

	const result$ = source$.pipe(mapButtonLoading());
	const result = await firstValueFrom(result$);
	expect(result).toBe(100);
});