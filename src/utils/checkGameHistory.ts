import { z } from "zod";
import type { GameHistory } from "../types/GameHistory";
import type { GameSession } from "../types/GameSession";
import { backupInvalidData } from "./backupInvalidData";
import { backupAndClearLocalStorage } from "./backupAndClearLocalStorage";

// Schema pour accepter soit string[] (ancien format) soit GameSession (nouveau format)
const GameHistoryValueSchema: z.ZodType<string[] | GameSession> = z.union([
	z.array(z.string()),
	z.object({
		winAt: z.string(),
		lettersFound: z.array(z.string()),
		wordsFound: z.number().optional()
	})
]);

const GameHistorySchema: z.ZodType<GameHistory> = z.record(z.string(), GameHistoryValueSchema);

export function checkGameHistory(data: unknown): GameHistory {
	try {
		const validatedData: GameHistory = GameHistorySchema.parse(data);
		return validatedData;
	} catch (_error) {
		backupInvalidData(JSON.stringify(data), {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            provenance: "checkGameHistory",
        });

		backupAndClearLocalStorage();

		throw new Error(`Invalid game history structure`);
	}
}
