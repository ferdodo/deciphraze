import { z } from "zod";
import type { LetterSelection } from "../types/LetterSelection";
import { backupInvalidData } from "./backupInvalidData";

const LetterSelectionSchema: z.ZodType<LetterSelection> = z.string().nullable();

export function checkLetterSelection(data: unknown): LetterSelection {
	try {
		const validatedData: LetterSelection = LetterSelectionSchema.parse(data);
		return validatedData;
	} catch (_error) {
		backupInvalidData(JSON.stringify(data), {
			timestamp: new Date().toISOString(),
			userAgent: navigator.userAgent,
			provenance: "checkLetterSelection",
		});

		throw new Error(`Invalid letter selection structure`);
	}
}
