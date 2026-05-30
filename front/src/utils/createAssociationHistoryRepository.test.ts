import { describe, it, expect } from "vitest";
import { createAssociationHistoryRepository } from "./createAssociationHistoryRepository";
import { createLocalStorageMock } from "./createLocalStorageMock";

describe("createAssociationHistoryRepository", () => {
	let repository: ReturnType<typeof createAssociationHistoryRepository>;
	let storage: ReturnType<typeof createLocalStorageMock>;

	const setup = (): void => {
		storage = createLocalStorageMock();
		repository = createAssociationHistoryRepository(storage);
	};

	describe("getHistory", () => {
		it("should return empty array for day with no history", () => {
			setup();
			const history = repository.getHistory("2024-01-01");
			expect(history).toEqual([]);
		});

		it("should return history for a specific day", () => {
			setup();
			repository.addAssociation("2024-01-01", "A", "B", true);
			repository.addAssociation("2024-01-01", "C", "D", false);

			const history = repository.getHistory("2024-01-01");
			expect(history).toHaveLength(2);
			expect(history[0]).toMatchObject({
				letter: "A",
				symbol: "B",
				isCorrect: true,
				day: "2024-01-01"
			});
			expect(history[1]).toMatchObject({
				letter: "C",
				symbol: "D",
				isCorrect: false,
				day: "2024-01-01"
			});
		});
	});


	describe("hasErrors", () => {
		it("should return false when no history exists", () => {
			setup();
			const hasErrors = repository.hasErrors("2024-01-01");
			expect(hasErrors).toBe(false);
		});

		it("should return false when all associations are correct", () => {
			setup();
			repository.addAssociation("2024-01-01", "A", "A", true);
			repository.addAssociation("2024-01-01", "B", "B", true);
			repository.addAssociation("2024-01-01", "C", "C", true);

			const hasErrors = repository.hasErrors("2024-01-01");
			expect(hasErrors).toBe(false);
		});

		it("should return true when at least one association is incorrect", () => {
			setup();
			repository.addAssociation("2024-01-01", "A", "A", true);
			repository.addAssociation("2024-01-01", "B", "C", false);
			repository.addAssociation("2024-01-01", "D", "D", true);

			const hasErrors = repository.hasErrors("2024-01-01");
			expect(hasErrors).toBe(true);
		});
	});
});

