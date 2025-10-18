import { describe, it, expect } from "vitest";
import { backupInvalidData } from "./backupInvalidData";

describe("backupInvalidData", () => {
	it("should backup invalid data with metadata when localStorage is empty", () => {
		localStorage.clear();
		const invalidData = '{"invalid": "data"}';
		const metadata = { originalKey: "test_key", timestamp: "2024-01-01T00:00:00.000Z" };

		backupInvalidData(invalidData, metadata);

		const stored = localStorage.getItem("deciphraze_invalid_data_backups");
		expect(stored).toBeTruthy();
		
		const parsed = JSON.parse(stored || "");
		expect(parsed).toHaveLength(1);
		expect(parsed[0]).toEqual({
			data: invalidData,
			metadata
		});
	});

	it("should append to existing backups when localStorage has data", () => {
		localStorage.clear();
		const existingBackups = [
			{ data: "old_data", metadata: { key: "old" } }
		];
		localStorage.setItem("deciphraze_invalid_data_backups", JSON.stringify(existingBackups));

		const invalidData = '{"new": "data"}';
		const metadata = { originalKey: "new_key" };

		backupInvalidData(invalidData, metadata);

		const stored = localStorage.getItem("deciphraze_invalid_data_backups");
		const parsed = JSON.parse(stored || "");
		expect(parsed).toHaveLength(2);
		expect(parsed[1]).toEqual({
			data: invalidData,
			metadata
		});
	});


	it("should handle non-array data in localStorage", () => {
		localStorage.clear();
		localStorage.setItem("deciphraze_invalid_data_backups", JSON.stringify({ not: "array" }));

		const invalidData = '{"test": "data"}';
		const metadata = { originalKey: "test_key" };

		backupInvalidData(invalidData, metadata);

		const stored = localStorage.getItem("deciphraze_invalid_data_backups");
		const parsed = JSON.parse(stored || "");
		expect(parsed).toHaveLength(1);
		expect(parsed[0].data).toBe(invalidData);
	});
});