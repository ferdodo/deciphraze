import { createContext } from "react";
import type { LetterSelection } from "../types/LetterSelection";
import type { PlayerCipher } from "../types/PlayerCipher";
import type { SymbolSelection } from "../types/SymbolSelection";
import type { CipherService } from "../types/CipherService";

interface GameContextType {
	letterSelection: LetterSelection;
	playerCipher: PlayerCipher;
	symbolSelection: SymbolSelection;
	cipherService: CipherService;
}

export const GameContext = createContext<GameContextType | undefined>(
	undefined,
);
