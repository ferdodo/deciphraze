import { z } from "zod";
import type { AllAchievements } from "@deciphraze/core";
import type { StorageLike } from "./StorageLike";
import { getDefaultStorage } from "./getDefaultStorage";
import { backupInvalidData } from "./backupInvalidData";
import { backupAndClearLocalStorage } from "./backupAndClearLocalStorage";

const AllAchievementsSchema: z.ZodType<AllAchievements> = z.object({
	computedAtDate: z.string(),
	achievements: z.object({
		firstGame: z.object({
			name: z.literal("Préambule"),
			description: z.literal("Jouer votre première partie"),
			unlocked: z.boolean()
		}),
		streak5Days: z.object({
			name: z.literal("Momentum"),
			description: z.literal("Réussir une partie 3 jours consécutifs"),
			unlocked: z.boolean(),
			progress: z.object({
				current: z.number(),
				target: z.literal(3)
			})
		}),
		firstLetterA: z.object({
			name: z.literal("Aperçu"),
			description: z.literal("Trouver la lettre A en premier"),
			unlocked: z.boolean()
		}),
		firstLetterE: z.object({
			name: z.literal("Élémentaire"),
			description: z.literal("Trouver la lettre E en premier"),
			unlocked: z.boolean()
		}),
		firstLetterY: z.object({
			name: z.literal("Mythique"),
			description: z.literal("Trouver la lettre Y en premier"),
			unlocked: z.boolean()
		}),
		wordInOrder: z.object({
			name: z.literal("Signature"),
			description: z.literal("Trouver toutes les lettres d'un mot d'au moins 5 lettres dans l'ordre"),
			unlocked: z.boolean()
		}),
		alphaAndOmega: z.object({
			name: z.literal("Synthèse"),
			description: z.literal("Déchiffrer la première lettre en premier, la dernière en dernier"),
			unlocked: z.boolean()
		}),
		firstLetterQ: z.object({
			name: z.literal("Qualifié"),
			description: z.literal("Trouver la lettre Q en premier"),
			unlocked: z.boolean()
		}),
		words1000: z.object({
			name: z.literal("Scribe"),
			description: z.literal("Déchiffrez 500 mots"),
			unlocked: z.boolean(),
			progress: z.object({
				current: z.number(),
				target: z.literal(500)
			})
		}),
		completeAlphabet: z.object({
			name: z.literal("Lettré"),
			description: z.literal("Trouver toutes les lettres de l'alphabet"),
			unlocked: z.boolean(),
			progress: z.object({
				current: z.number(),
				target: z.literal(26)
			})
		}),
		paleographer: z.object({
			name: z.literal("Paléographe"),
			description: z.literal("Compléter une partie sans erreur d'association"),
			unlocked: z.boolean()
		}),
		allVowelsInSequence: z.object({
			name: z.literal("Vocaliste"),
			description: z.literal("Trouver toutes les voyelles à la suite"),
			unlocked: z.boolean()
		}),
		doublet: z.object({
			name: z.literal("Doublet"),
			description: z.literal("Trouver une double lettre en premier"),
			unlocked: z.boolean()
		})
	})
});

export function checkAchievements(data: unknown, storage: StorageLike | null = getDefaultStorage()): AllAchievements {
	try {
		const validatedData: AllAchievements = AllAchievementsSchema.parse(data);
		return validatedData;
	} catch (_error) {
		backupInvalidData(JSON.stringify(data), {
			timestamp: new Date().toISOString(),
			userAgent: navigator.userAgent,
			provenance: "checkAchievements",
		}, storage);

		backupAndClearLocalStorage(storage);

		throw new Error(`Invalid achievements structure`);
	}
}
