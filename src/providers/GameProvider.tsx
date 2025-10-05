import type React from "react";
import { GameContext } from "../contexts/GameContext";
import { createLetterSelection } from "../services/createLetterSelection";
import { createPlayerCipher } from "../services/createPlayerCipher";
import { createSymbolSelection } from "../services/createSymbolSelection";
import { createCipherService } from "../services/createCipherService";

interface GameProviderProps {
	children: React.ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
	const letterSelection = createLetterSelection();
	const playerCipher = createPlayerCipher();
	const symbolSelection = createSymbolSelection();
	const cipherService = createCipherService();

	const value = {
		letterSelection,
		playerCipher,
		symbolSelection,
		cipherService,
	};

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
