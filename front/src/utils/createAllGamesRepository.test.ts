import { describe, it, expect } from "vitest";
import { createAllGamesRepository } from "./createAllGamesRepository";
import type { StorageLike } from "./StorageLike";
import type { AllGames } from "../entities/AllGames";

function createLocalStorageMock(): StorageLike {
	let store: Record<string, string> = {};

	return {
		getItem: (key: string) => store[key] ?? null,
		setItem: (key: string, value: string) => {
			store[key] = value;
		},
		removeItem: (key: string) => {
			delete store[key];
		},
		clear: () => {
			store = {};
		},
		get length(): number {
			return Object.keys(store).length;
		},
		key: (index: number) => Object.keys(store)[index] ?? null,
	};
}

describe("createAllGamesRepository", () => {

	describe("initialization", () => {
		it("should initialize with empty gameByDay when storage is empty", () => {
			const storage = createLocalStorageMock();
			const repository = createAllGamesRepository(storage);
			const result = repository.get();

			expect(result.gameByDay).toEqual({});
		});
	});

	describe("get()", () => {
		it("should return updated data after upsertByDay", () => {
			const storage = createLocalStorageMock();
			const repository = createAllGamesRepository(storage);

			repository.upsertByDay("2025-01-01", {
				letterSelection: "A",
				symbolSelection: "X",
				playerCipher: { A: "X" },
			});

			const result = repository.get();
			expect(result.gameByDay["2025-01-01"]).toEqual({
				letterSelection: "A",
				symbolSelection: "X",
				playerCipher: { A: "X" },
			});
		});
	});

	describe("subscribe()", () => {
		it("should emit initial state when subscribed", async () => {
			const storage = createLocalStorageMock();
			const repository = createAllGamesRepository(storage);

			const result = await new Promise<AllGames>((resolve) => {
				repository.subscribe().subscribe((allGames) => {
					resolve(allGames);
				});
			});

			expect(result.gameByDay).toEqual({});
		});

		it("should emit updated state when upsertByDay is called", async () => {
			const storage = createLocalStorageMock();
			const repository = createAllGamesRepository(storage);
			const emissions: AllGames[] = [];

			const subscription = repository.subscribe().subscribe((allGames) => {
				emissions.push(allGames);
			});

			// Wait for initial emission
			await new Promise((resolve) => setTimeout(resolve, 10));

			repository.upsertByDay("2025-01-01", {
				letterSelection: "B",
				symbolSelection: "Y",
				playerCipher: { B: "Y" },
			});

			// Wait for second emission
			await new Promise((resolve) => setTimeout(resolve, 10));

			expect(emissions.length).toBeGreaterThanOrEqual(2);
			expect(emissions[0].gameByDay).toEqual({});
			expect(emissions[emissions.length - 1].gameByDay["2025-01-01"]).toEqual({
				letterSelection: "B",
				symbolSelection: "Y",
				playerCipher: { B: "Y" },
			});

			subscription.unsubscribe();
		});

		it("should emit updated state when clear is called", async () => {
			const storage = createLocalStorageMock();
			const existingGames: AllGames = {
				gameByDay: {
					"2025-01-01": {
						letterSelection: "A",
						symbolSelection: "X",
						playerCipher: { A: "X" },
					},
				},
			};
			storage.setItem("deciphraze_all_games", JSON.stringify(existingGames));

			const repository = createAllGamesRepository(storage);
			const emissions: AllGames[] = [];

			const subscription = repository.subscribe().subscribe((allGames) => {
				emissions.push(allGames);
			});

			// Wait for initial emission
			await new Promise((resolve) => setTimeout(resolve, 10));

			repository.clear();

			// Wait for clear emission
			await new Promise((resolve) => setTimeout(resolve, 10));

			expect(emissions.length).toBeGreaterThanOrEqual(2);
			expect(Object.keys(emissions[0].gameByDay).length).toBe(1);
			expect(emissions[emissions.length - 1].gameByDay).toEqual({});

			subscription.unsubscribe();
		});
	});
});
