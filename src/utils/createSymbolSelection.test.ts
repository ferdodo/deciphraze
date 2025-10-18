import { describe, it, expect } from "vitest";
import { createSymbolSelection } from "./createSymbolSelection";

describe("createSymbolSelection", () => {
	it("should start with null selection", () => {
		const symbolSelection = createSymbolSelection();
		expect(symbolSelection.getSymbolSelection()).toBeNull();
	});

	it("should select a symbol", () => {
		const symbolSelection = createSymbolSelection();
		symbolSelection.selectSymbol("X");
		expect(symbolSelection.getSymbolSelection()).toBe("X");
	});

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


	it("should load selection from localStorage", () => {
		localStorage.setItem("deciphraze_symbol_selection", '"Z"');
		const newSymbolSelection = createSymbolSelection();
		expect(newSymbolSelection.getSymbolSelection()).toBe("Z");
	});

	it("should handle invalid localStorage data", () => {
		localStorage.setItem("deciphraze_symbol_selection", "invalid json");
		const newSymbolSelection = createSymbolSelection();
		expect(newSymbolSelection.getSymbolSelection()).toBeNull();
	});
});
