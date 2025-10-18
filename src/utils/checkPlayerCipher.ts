import { z } from "zod";
import type { PlayerCipher } from "../types/PlayerCipher";
import { backupInvalidData } from "./backupInvalidData";

const PlayerCipherSchema: z.ZodType<PlayerCipher> = z.record(z.string(), z.string());

export function checkPlayerCipher(data: unknown): PlayerCipher {
	try {
		const validatedData: PlayerCipher = PlayerCipherSchema.parse(data);
		return validatedData;
	} catch (_error) {
		backupInvalidData(JSON.stringify(data), {
			timestamp: new Date().toISOString(),
			userAgent: navigator.userAgent,
			provenance: "checkPlayerCipher",
		});

		throw new Error(`Invalid player cipher structure`);
	}
}
