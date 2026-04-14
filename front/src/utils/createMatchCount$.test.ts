import { describe, it, expect } from "vitest";
import { skip } from "rxjs/operators";
import { createTimeService } from "@deciphraze/browser";
import { createMatchCount$ } from "./createMatchCount$";
import { createAllGamesRepositoryMock } from "../mocks/createAllGamesRepositoryMock";
import { createForcedDayRepositoryMock } from "../mocks/createForcedDayRepositoryMock";

describe("createMatchCount$", () => {
	it("should start with 0 matches", async () => {
		const allGamesRepository = createAllGamesRepositoryMock();
		const timeService = createTimeService();
		const forcedDayRepository = createForcedDayRepositoryMock();
		const matchCount$ = createMatchCount$(allGamesRepository, timeService, forcedDayRepository);

		return new Promise<void>((resolve) => {
			matchCount$.subscribe((count) => {
				expect(count).toBe(0);
				resolve();
			});
		});
	});

	it("should update count when player cipher changes", async () => {
		const day = "2024-01-01";
		const allGamesRepository = createAllGamesRepositoryMock();
		const timeService = createTimeService();
		const forcedDayRepository = createForcedDayRepositoryMock();
		forcedDayRepository.forceVirtualDate(day);
		
		const matchCount$ = createMatchCount$(allGamesRepository, timeService, forcedDayRepository);

		return new Promise<void>((resolve) => {
			// Skip initial emission and wait for the change
			matchCount$.pipe(skip(1)).subscribe((count) => {
				expect(count).toBe(1);
				resolve();
			});
			// Trigger the change
			allGamesRepository.upsertByDay(day, {
				letterSelection: null,
				symbolSelection: null,
				playerCipher: { A: "X" },
			});
		});
	});

});
