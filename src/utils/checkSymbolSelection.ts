import { z } from "zod";
import type { SymbolSelection } from "../types/SymbolSelection";
import { backupInvalidData } from "./backupInvalidData";

const SymbolSelectionSchema: z.ZodType<SymbolSelection> = z.string().nullable();

export function checkSymbolSelection(data: unknown): SymbolSelection {
	try {
		const validatedData: SymbolSelection = SymbolSelectionSchema.parse(data);
		return validatedData;
	} catch (_error) {
		backupInvalidData(JSON.stringify(data), {
			timestamp: new Date().toISOString(),
			userAgent: navigator.userAgent,
			provenance: "checkSymbolSelection",
		});

		throw new Error(`Invalid symbol selection structure`);
	}
}
