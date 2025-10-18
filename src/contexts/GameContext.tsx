import { createContext } from "react";
import type { GameContextType } from "../types/GameContextType";

export const GameContext: React.Context<GameContextType | undefined> = createContext<GameContextType | undefined>(
	undefined,
);
