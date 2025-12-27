import { describe, it, expect } from "vitest";
import { backupInvalidData } from "./backupInvalidData";
import { createLocalStorageMock } from "./createLocalStorageMock";

describe("backupInvalidData", () => {
	it("should backup invalid data with metadata when localStorage is empty", () => {
		const storage = createLocalStorageMock();
		const invalidData = '{"invalid": "data"}';
		const metadata = { originalKey: "test_key", timestamp: "2024-01-01T00:00:00.000Z" };

		backupInvalidData(invalidData, metadata, storage);

		const stored = storage.getItem("deciphraze_invalid_data_backups");
		expect(stored).toBeTruthy();
		
		const parsed = JSON.parse(stored || "");
		expect(parsed).toHaveLength(1);
		expect(parsed[0]).toEqual({
			data: invalidData,
			metadata
		});
	});

	it("should append to existing backups when localStorage has data", () => {
		const storage = createLocalStorageMock();
		const existingBackups = [
			{ data: "old_data", metadata: { key: "old" } }
		];
		storage.setItem("deciphraze_invalid_data_backups", JSON.stringify(existingBackups));

		const invalidData = '{"new": "data"}';
		const metadata = { originalKey: "new_key" };

		backupInvalidData(invalidData, metadata, storage);

		const stored = storage.getItem("deciphraze_invalid_data_backups");
		const parsed = JSON.parse(stored || "");
		expect(parsed).toHaveLength(2);
		expect(parsed[1]).toEqual({
			data: invalidData,
			metadata
		});
	});


	it("should handle non-array data in localStorage", () => {
		const storage = createLocalStorageMock();
		storage.setItem("deciphraze_invalid_data_backups", JSON.stringify({ not: "array" }));

		const invalidData = '{"test": "data"}';
		const metadata = { originalKey: "test_key" };

		backupInvalidData(invalidData, metadata, storage);

		const stored = storage.getItem("deciphraze_invalid_data_backups");
		const parsed = JSON.parse(stored || "");
		expect(parsed).toHaveLength(1);
		expect(parsed[0].data).toBe(invalidData);
	});
});