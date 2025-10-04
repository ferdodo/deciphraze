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
		it("should select a symbol", () => {
			symbolSelection = createSymbolSelection();
			symbolSelection.selectSymbol("X");
			const selected = symbolSelection.getSymbolSelection();
			expect(selected).toBe("X");
		});

		it("should normalize and uppercase symbol", () => {
			symbolSelection = createSymbolSelection();
			symbolSelection.selectSymbol("x");
			const selected = symbolSelection.getSymbolSelection();
			expect(selected).toBe("X");
		});

		it("should clear selection with null", () => {
			symbolSelection = createSymbolSelection();
			symbolSelection.selectSymbol("X");
			symbolSelection.selectSymbol(null);
			const selected = symbolSelection.getSymbolSelection();
			expect(selected).toBeNull();
		});
	});

	describe("Edge cases", () => {
		it("should handle empty string", () => {
			symbolSelection = createSymbolSelection();
			symbolSelection.selectSymbol("");
			const selected = symbolSelection.getSymbolSelection();
			expect(selected).toBe("");
		});
	});
});
