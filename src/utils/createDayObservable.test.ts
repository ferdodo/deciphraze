import { describe, it, expect } from "vitest";
import { createDayObservable } from "./createDayObservable";

describe("createDayObservable", () => {
	it("should emit current date immediately", () => {
		const observable = createDayObservable();
		const emittedValues: string[] = [];

		observable.subscribe(value => {
			emittedValues.push(value);
		});

		expect(emittedValues).toHaveLength(1);
		// Vérifier que la date est au bon format
		expect(emittedValues[0]).toMatch(/^\d{4}-\d{2}-\d{2}$/);
	});

});
