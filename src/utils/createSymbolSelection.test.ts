import { describe, it, expect } from "vitest";
import { createSymbolSelection } from "./createSymbolSelection";

describe("createSymbolSelection", () => {
	it("should clear selection with null", () => {
		const symbolSelection = createSymbolSelection();
		symbolSelection.selectSymbol("X");
		symbolSelection.selectSymbol(null);
		expect(symbolSelection.getSymbolSelection()).toBeNull();
	});

	it("should handle empty string as null", () => {
		const symbolSelection = createSymbolSelection();
		symbolSelection.selectSymbol("");
		expect(symbolSelection.getSymbolSelection()).toBeNull();
	});
});
