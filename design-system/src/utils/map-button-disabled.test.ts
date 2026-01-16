import { firstValueFrom, of } from "rxjs";
import { expect, test } from "vitest";
import { mapButtonDisabled } from "./map-button-disabled";

test("Should be disabled when having disabled attribute", async function () {
	const disabled = true;
	const activeIndeterminateProgress = false;
	const loading = 0;

	const source$ = of(<[boolean, boolean, number]>[
		disabled,
		activeIndeterminateProgress,
		loading
	]);

	const result$ = source$.pipe(mapButtonDisabled());
	const result = await firstValueFrom(result$);
	expect(result).toBe(true);
});

test("Should be disabled when having active indeterminate progress", async function () {
	const disabled = false;
	const activeIndeterminateProgress = true;
	const loading = 0;

	const source$ = of(<[boolean, boolean, number]>[
		disabled,
		activeIndeterminateProgress,
		loading
	]);

	const result$ = source$.pipe(mapButtonDisabled());
	const result = await firstValueFrom(result$);
	expect(result).toBe(true);
});

test("Should be disabled when having loading", async function () {
	const disabled = false;
	const activeIndeterminateProgress = false;
	const loading = 25;

	const source$ = of(<[boolean, boolean, number]>[
		disabled,
		activeIndeterminateProgress,
		loading
	]);

	const result$ = source$.pipe(mapButtonDisabled());
	const result = await firstValueFrom(result$);
	expect(result).toBe(true);
});

test("Should be false when loading is 100", async function () {
	const disabled = false;
	const activeIndeterminateProgress = false;
	const loading = 100;

	const source$ = of(<[boolean, boolean, number]>[
		disabled,
		activeIndeterminateProgress,
		loading
	]);

	const result$ = source$.pipe(mapButtonDisabled());
	const result = await firstValueFrom(result$);
	expect(result).toBe(false);
});

test("Should be false when loading is 0", async function () {
	const disabled = false;
	const activeIndeterminateProgress = false;
	const loading = 0;

	const source$ = of(<[boolean, boolean, number]>[
		disabled,
		activeIndeterminateProgress,
		loading
	]);

	const result$ = source$.pipe(mapButtonDisabled());
	const result = await firstValueFrom(result$);
	expect(result).toBe(false);
});

test("Should be false when loading is above 100", async function () {
	const disabled = false;
	const activeIndeterminateProgress = false;
	const loading = 101;

	const source$ = of(<[boolean, boolean, number]>[
		disabled,
		activeIndeterminateProgress,
		loading
	]);

	const result$ = source$.pipe(mapButtonDisabled());
	const result = await firstValueFrom(result$);
	expect(result).toBe(false);
});

test("Should be false when loading under 0", async function () {
	const disabled = false;
	const activeIndeterminateProgress = false;
	const loading = -1;

	const source$ = of(<[boolean, boolean, number]>[
		disabled,
		activeIndeterminateProgress,
		loading
	]);

	const result$ = source$.pipe(mapButtonDisabled());
	const result = await firstValueFrom(result$);
	expect(result).toBe(false);
});

test("Should be true when loading is ongoing", async function () {
	const disabled = false;
	const activeIndeterminateProgress = false;
	const loading = 19;

	const source$ = of(<[boolean, boolean, number]>[
		disabled,
		activeIndeterminateProgress,
		loading
	]);

	const result$ = source$.pipe(mapButtonDisabled());
	const result = await firstValueFrom(result$);
	expect(result).toBe(true);
});
