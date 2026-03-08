import type { AllAchievements } from "@deciphraze/core";

export type ViewedAchievements = Record<keyof AllAchievements["achievements"], boolean>;
