import type React from "react";
import styles from "./DeciAchievements.module.css";
import { DeciAchievement } from "./DeciAchievement";
import { DeciAchievementFooter } from "./DeciAchievementFooter";
import { DeciText } from "./DeciText";

interface AllAchievements {
	computedAtDate: string;
	achievements: {
		firstGame: {
			name: "Préambule";
			description: "Jouer votre première partie";
			unlocked: boolean;
		};
		streak5Days: {
			name: "Momentum";
			description: "Réussir une partie 3 jours consécutifs";
			unlocked: boolean;
			progress: {
				current: number;
				target: 3;
			};
		};
		firstLetterA: {
			name: "Aperçu";
			description: "Trouver la lettre A en premier";
			unlocked: boolean;
		};
		firstLetterE: {
			name: "Élémentaire";
			description: "Trouver la lettre E en premier";
			unlocked: boolean;
		};
		firstLetterY: {
			name: "Mythique";
			description: "Trouver la lettre Y en premier";
			unlocked: boolean;
		};
		firstLetterQ: {
			name: "Qualifié";
			description: "Trouver la lettre Q en premier";
			unlocked: boolean;
		};
		words1000: {
			name: "Scribe";
			description: "Déchiffrez 500 mots";
			unlocked: boolean;
			progress: {
				current: number;
				target: 500;
			};
		};
		paleographer: {
			name: "Paléographe";
			description: "Compléter une partie sans erreur d'association";
			unlocked: boolean;
		};
		doublet: {
			name: "Doublet";
			description: "Trouver une double lettre en premier";
			unlocked: boolean;
		};
	};
}

interface DeciAchievementsProps {
	achievements: AllAchievements;
	unlockedCount: number;
	currentStreak: number;
	newAchievementIds?: string[];
	onMarkAllAsViewed?: () => void;
}

type AchievementOrPlatinum = {
	name: "Préambule" | "Momentum" | "Aperçu" | "Élémentaire" | "Mythique" | "Qualifié" | "Scribe" | "Paléographe" | "Doublet" | "Platine";
	description: string;
	unlocked: boolean;
	progress?: {
		current: number;
		target: number;
	};
}

export function DeciAchievements({
	achievements,
	unlockedCount,
	currentStreak,
	newAchievementIds = [],
	onMarkAllAsViewed,
}: DeciAchievementsProps): React.ReactNode {
	const newIdsSet = new Set(newAchievementIds);
	const achievementsList = Object.entries(achievements.achievements);
	const allAchievementsUnlocked = achievementsList.every(([, achievement]) => achievement.unlocked);

	const platinumAchievement: AchievementOrPlatinum = {
		name: "Platine",
		description: "Débloquer tous les succès",
		unlocked: allAchievementsUnlocked
	};

	return (
		<>
			<div style={{ textAlign: "center" }}>
				<DeciText variant="primary">
					{allAchievementsUnlocked ? unlockedCount + 1 : unlockedCount}/{achievementsList.length + 1} succès débloqués
				</DeciText>
			</div>
			<br />
			<div className={styles.achievementsList}>
				{achievementsList.map(([key, achievement]) => (
					<DeciAchievement 
						key={key} 
						achievement={achievement} 
						currentStreak={currentStreak}
						isNew={newIdsSet.has(key)}
					/>
				))}
				<DeciAchievement 
					key="platinum"
					achievement={platinumAchievement}
					currentStreak={currentStreak}
					isNew={newIdsSet.has("platinum")}
					iconType="diamond"
				/>
			</div>
			{newAchievementIds.length > 0 && onMarkAllAsViewed && (
				<div slot="footer">
					<DeciAchievementFooter 
						newAchievementIds={newAchievementIds}
						onMarkAllAsViewed={onMarkAllAsViewed}
					/>
				</div>
			)}
		</>
	);
}
