import { useContext } from "react";
import { deciUiContext } from "../contexts/deciUiContext";
import type { DeciUiContext } from "../types/DeciUiContext";

export function useDeciUiContext(): DeciUiContext {
	const context = useContext(deciUiContext);
	
	if (context === undefined) {
		throw new Error("useDeciUiContext must be used within a DeciUiProvider");
	}
	
	return context;
}
