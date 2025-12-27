import { createContext, type Context } from "react";
import type { GameContext } from "./GameContext";

export const gameContext: Context<GameContext | undefined> = createContext<GameContext | undefined>(
	undefined,
);
