import React from "react";
import { GameContext } from "../contexts/GameContext";
import { createLetterSelection } from "../createLetterSelection";
import { createPlayerCipher } from "../createPlayerCipher";
import { createSymbolSelection } from "../createSymbolSelection";
import { createGameHistoryService } from "../createGameHistoryService";

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
