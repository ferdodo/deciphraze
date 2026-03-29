import { describe, it, expect } from "vitest";
import { firstValueFrom } from "rxjs";
import { skip } from "rxjs/operators";
import { createDayRepository } from "./createDayRepository";
import { formatDate } from "./formatDate";

describe("createDayRepository", () => {
	it("should return current date in YYYY-MM-DD format", () => {
		const repository = createDayRepository();
		const day = repository.getRealTodaysDate();
		const today = formatDate(new Date());
		
		expect(day).toBe(today);
		expect(day).toMatch(/^\d{4}-\d{2}-\d{2}$/);
	});

	it("should update day with setRealTodaysDate", () => {
		const repository = createDayRepository();
		repository.setRealTodaysDate("2024-01-15");
		
		expect(repository.getRealTodaysDate()).toBe("2024-01-15");
	});

	it("should emit day changes through observeRealTodaysDate", async () => {
		const repository = createDayRepository();
		
		const dayPromise = firstValueFrom(repository.observeRealTodaysDate().pipe(skip(1)));
		repository.setRealTodaysDate("2024-01-15");
		
		const day = await dayPromise;
		expect(day).toBe("2024-01-15");
	});
});

