import { z } from "zod";
import type { GameHistory } from "../types/GameHistory";
import { backupInvalidData } from "./backupInvalidData";
import { backupAndClearLocalStorage } from "./backupAndClearLocalStorage";

const GameHistorySchema: z.ZodType<GameHistory> = z.record(z.string(), z.array(z.string()));

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
