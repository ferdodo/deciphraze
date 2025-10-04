import type React from "react";
import { GameContext } from "../contexts/GameContext";
import { createLetterSelection } from "../services/createLetterSelection";
import { createPlayerCipher } from "../services/createPlayerCipher";
import { createSymbolSelection } from "../services/createSymbolSelection";
import { createGameHistoryService } from "../services/createGameHistoryService";

interface GameProviderProps {
	children: React.ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
	const letterSelection = createLetterSelection();
	const playerCipher = createPlayerCipher();
	const symbolSelection = createSymbolSelection();
	const gameHistory = createGameHistoryService();

	const value = {
		letterSelection,
		playerCipher,
		symbolSelection,
		gameHistory,
	};

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
