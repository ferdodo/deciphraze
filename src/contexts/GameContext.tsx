import { createContext } from "react";
import type { LetterSelectionRepository } from "../types/LetterSelectionRepository";
import type { PlayerCipherRepository } from "../types/PlayerCipherRepository";
import type { SymbolSelectionRepository } from "../types/SymbolSelectionRepository";
import type { CipherRepository } from "../types/CipherRepository";

interface GameContextType {
	letterSelectionRepository: LetterSelectionRepository;
	playerCipherRepository: PlayerCipherRepository;
	symbolSelectionRepository: SymbolSelectionRepository;
	cipherRepository: CipherRepository;
}

export const GameContext = createContext<GameContextType | undefined>(
	undefined,
);
