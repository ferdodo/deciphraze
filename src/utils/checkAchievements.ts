import { z } from "zod";
import type { AllAchievements } from "../types/AllAchievements";
import { backupInvalidData } from "./backupInvalidData";
import { backupAndClearLocalStorage } from "./backupAndClearLocalStorage";

const AllAchievementsSchema: z.ZodType<AllAchievements> = z.object({
	computedAtDate: z.string(),
	achievements: z.object({
		firstGame: z.object({
			achievementId: z.literal("first_game"),
			name: z.literal("Preambule"),
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
		}),
		firstLetterE: z.object({
			achievementId: z.literal("first_letter_e"),
			name: z.literal("Commencer par E"),
			description: z.literal("Trouver la lettre E en premier"),
			unlocked: z.boolean()
		}),
		firstLetterY: z.object({
			achievementId: z.literal("first_letter_y"),
			name: z.literal("Commencer par Y"),
			description: z.literal("Trouver la lettre Y en premier"),
			unlocked: z.boolean()
		}),
		wordInOrder: z.object({
			achievementId: z.literal("word_in_order"),
			name: z.literal("Signature"),
			description: z.literal("Trouver toutes les lettres d'un mot d'au moins 5 lettres dans l'ordre"),
			unlocked: z.boolean()
		}),
		alphaAndOmega: z.object({
			achievementId: z.literal("alpha_and_omega"),
			name: z.literal("Synthèse"),
			description: z.literal("Trouver respectivement la première lettre en premier et la dernière en dernier"),
			unlocked: z.boolean()
		}),
		firstLetterQ: z.object({
			achievementId: z.literal("first_letter_q"),
			name: z.literal("Commencer par Q"),
			description: z.literal("Trouver la lettre Q en premier"),
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

		backupAndClearLocalStorage();

		throw new Error(`Invalid achievements structure`);
	}
}
