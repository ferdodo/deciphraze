import { describe, it, expect } from "vitest";
import { createDiscoveryOrderRepository } from "./createDiscoveryOrderRepository";
import { createLocalStorageMock } from "./createLocalStorageMock";
import type { DiscoveryOrder } from "../entities/DiscoveryOrder";

describe("createDiscoveryOrderRepository", () => {
	it("should return empty array when no discovery order exists for a date", () => {
		const storage = createLocalStorageMock();
		const repository = createDiscoveryOrderRepository(storage);
		const order = repository.getDiscoveryOrder("2024-01-01");

		expect(order).toEqual([]);
	});

	it("should set and get discovery order for a date", () => {
		const storage = createLocalStorageMock();
		const repository = createDiscoveryOrderRepository(storage);
		const order: DiscoveryOrder = ["A", "B", "C"];

		repository.setDiscoveryOrder("2024-01-01", order);
		const retrieved = repository.getDiscoveryOrder("2024-01-01");

		expect(retrieved).toEqual(["A", "B", "C"]);
	});

	it("should add letter to discovery order", () => {
		const storage = createLocalStorageMock();
		const repository = createDiscoveryOrderRepository(storage);

		repository.addLetterToDiscoveryOrder("2024-01-01", "A");
		repository.addLetterToDiscoveryOrder("2024-01-01", "B");
		repository.addLetterToDiscoveryOrder("2024-01-01", "C");

		const order = repository.getDiscoveryOrder("2024-01-01");
		expect(order).toEqual(["A", "B", "C"]);
	});

	it("should not add duplicate letters to discovery order", () => {
		const storage = createLocalStorageMock();
		const repository = createDiscoveryOrderRepository(storage);

		repository.addLetterToDiscoveryOrder("2024-01-01", "A");
		repository.addLetterToDiscoveryOrder("2024-01-01", "B");
		repository.addLetterToDiscoveryOrder("2024-01-01", "A"); // Duplicate

		const order = repository.getDiscoveryOrder("2024-01-01");
		expect(order).toEqual(["A", "B"]);
	});

	it("should handle JSON parse errors gracefully", () => {
		const storage = createLocalStorageMock();
		storage.setItem("deciphraze_discovery_order", "invalid json{");

		const repository = createDiscoveryOrderRepository(storage);
		const order = repository.getDiscoveryOrder("2024-01-01");

		expect(order).toEqual([]);
	});

});

