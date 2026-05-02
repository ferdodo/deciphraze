import { z } from "zod";
import type { GameHistory } from "@deciphraze/core";
import type { GameSession } from "@deciphraze/core";
import type { StorageLike } from "./StorageLike";
import { backupInvalidData } from "./backupInvalidData";
import { backupAndClearLocalStorage } from "./backupAndClearLocalStorage";

// Schema pour accepter soit string[] (ancien format) soit GameSession (nouveau format)
const GameHistoryValueSchema: z.ZodType<string[] | GameSession> = z.union([
	z.array(z.string()),
	z.object({
		winAt: z.string(),
		lettersFound: z.array(z.string()),
		wordsFound: z.number().optional(),
		hasErrors: z.boolean().optional()
	})
]);

const GameHistorySchema: z.ZodType<GameHistory> = z.record(z.string(), GameHistoryValueSchema);

export function checkGameHistory(data: unknown, storage: StorageLike): GameHistory {
	try {
		const validatedData: GameHistory = GameHistorySchema.parse(data);
		return validatedData;
	} catch (_error) {
		backupInvalidData(JSON.stringify(data), {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            provenance: "checkGameHistory",
        }, storage);

		backupAndClearLocalStorage(storage);

		throw new Error(`Invalid game history structure`);
	}
}
