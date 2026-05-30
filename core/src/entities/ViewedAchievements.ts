import type { AllAchievements } from "./AllAchievements";

export type ViewedAchievements = Record<keyof AllAchievements["achievements"], boolean>;
