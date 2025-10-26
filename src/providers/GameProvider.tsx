import type React from "react";
import { useEffect, useMemo } from "react";
import { GameContext } from "../contexts/GameContext";
import { createLetterSelection } from "../utils/createLetterSelection";
import { createPlayerCipher } from "../utils/createPlayerCipher";
import { createSymbolSelection } from "../utils/createSymbolSelection";
import { createCipherRepository } from "../utils/createCipherRepository";
import { createGameHistoryRepository } from "../utils/createGameHistoryRepository";
import { createAchievementRepository } from "../utils/createAchievementRepository";
import { createParagraphOfTheDayRepository } from "../utils/createParagraphOfTheDayRepository";
import { createDayRepository } from "../utils/createDayRepository";
import { createDiscoveryOrderRepository } from "../utils/createDiscoveryOrderRepository";
import { initializeGameSideEffects } from "../utils/initializeGameSideEffects";

interface GameProviderProps {
	children: React.ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }: GameProviderProps) => {
	const letterSelection = createLetterSelection();
	const playerCipher = createPlayerCipher();
	const symbolSelection = createSymbolSelection();
	const cipherRepository = createCipherRepository();
	const gameHistoryRepository = createGameHistoryRepository();
	const achievementRepository = createAchievementRepository();
	const paragraphOfTheDayRepository = createParagraphOfTheDayRepository();
	const dayRepository = createDayRepository();
	const discoveryOrderRepository = createDiscoveryOrderRepository();

	const value = useMemo(() => ({
		letterSelectionRepository: letterSelection,
		playerCipherRepository: playerCipher,
		symbolSelectionRepository: symbolSelection,
		cipherRepository: cipherRepository,
		gameHistoryRepository: gameHistoryRepository,
		achievementRepository: achievementRepository,
		paragraphOfTheDayRepository: paragraphOfTheDayRepository,
		dayRepository: dayRepository,
		discoveryOrderRepository: discoveryOrderRepository,
	}), [
		letterSelection,
		playerCipher,
		symbolSelection,
		cipherRepository,
		gameHistoryRepository,
		achievementRepository,
		paragraphOfTheDayRepository,
		dayRepository,
		discoveryOrderRepository,
	]);

	// Initialiser les effets de bord du jeu
	useEffect(() => {
		const cleanup = initializeGameSideEffects(value);
		return cleanup;
	}, [value]);

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
