import type { GameSession } from "../types/GameSession";
import type { AchievementRepository } from "../types/AchievementRepository";
import type { GameHistoryRepository } from "../types/GameHistoryRepository";
import { calculateAchievements } from "../utils/calculateAchievements";

export function registerWinnedGame(
	gameSession: GameSession,
	achievementRepository: AchievementRepository,
	gameHistoryRepository: GameHistoryRepository
): void {
	// 1. Sauvegarder la nouvelle partie
	gameHistoryRepository.addSession(gameSession);
	
	// 2. Récupérer l'historique complet
	const fullHistory = gameHistoryRepository.getHistory();
	
	// 3. Calculer les nouveaux achievements
	const newAchievements = calculateAchievements(fullHistory);
	
	// 4. Sauvegarder les achievements
	achievementRepository.saveAchievements(newAchievements);
}
