import { createContext } from "react";
import type { LetterSelection } from "../types/LetterSelection";
import type { PlayerCipher } from "../types/PlayerCipher";
import type { SymbolSelection } from "../types/SymbolSelection";

interface GameContextType {
	letterSelection: LetterSelection;
	playerCipher: PlayerCipher;
	symbolSelection: SymbolSelection;
}

export const GameContext = createContext<GameContextType | undefined>(
	undefined,
);
