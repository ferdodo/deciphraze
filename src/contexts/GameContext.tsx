import { createContext } from "react";
import type { LetterSelection } from "../types/LetterSelection";
import type { PlayerCipher } from "../types/PlayerCipher";
import type { SymbolSelection } from "../types/SymbolSelection";
import type { GameHistoryService } from "../types/GameHistoryService";

interface GameContextType {
	letterSelection: LetterSelection;
	playerCipher: PlayerCipher;
	symbolSelection: SymbolSelection;
	gameHistory: GameHistoryService;
}

export const GameContext = createContext<GameContextType | undefined>(
	undefined,
);
