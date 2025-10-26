import { z } from "zod";
import type { AllAchievements } from "../types/AllAchievements";
import { backupInvalidData } from "./backupInvalidData";

const AllAchievementsSchema: z.ZodType<AllAchievements> = z.object({
	computedAtDate: z.string(),
	achievements: z.object({
		firstGame: z.object({
			achievementId: z.literal("first_game"),
			name: z.literal("Premier pas"),
			description: z.literal("Jouer votre première partie"),
			unlocked: z.boolean()
		}),
		streak5Days: z.object({
			achievementId: z.literal("streak_5_days"),
			name: z.literal("Série de 5 jours"),
			description: z.literal("Réussir une partie 5 jours consécutifs"),
			unlocked: z.boolean(),
			progress: z.object({
				current: z.number(),
				target: z.literal(5)
			})
		}),
		firstLetterA: z.object({
			achievementId: z.literal("first_letter_a"),
			name: z.literal("Commencer par A"),
			description: z.literal("Trouver la lettre A en premier"),
			unlocked: z.boolean()
		})
	})
});

export function checkAchievements(data: unknown): AllAchievements {
	try {
		const validatedData: AllAchievements = AllAchievementsSchema.parse(data);
		return validatedData;
	} catch (_error) {
		backupInvalidData(JSON.stringify(data), {
			timestamp: new Date().toISOString(),
			userAgent: navigator.userAgent,
			provenance: "checkAchievements",
		});

		throw new Error(`Invalid achievements structure`);
	}
}
