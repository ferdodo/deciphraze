import { describe, it, expect } from "vitest";
import { createSymbolSelection } from "./createSymbolSelection";

describe("createSymbolSelection", () => {
	let symbolSelection: ReturnType<typeof createSymbolSelection>;

	describe("Initialization", () => {
		it("should start with no selection", () => {
			symbolSelection = createSymbolSelection();
			const selected = symbolSelection.getSymbolSelection();
			expect(selected).toBeNull();
		});
	});

	describe("selectSymbol", () => {
		it("should clear selection with null", () => {
			symbolSelection = createSymbolSelection();
			symbolSelection.selectSymbol("X");
			symbolSelection.selectSymbol(null);
			const selected = symbolSelection.getSymbolSelection();
			expect(selected).toBeNull();
		});
	});
});
