import { useContext } from "react";
import { gameContext } from "../contexts/gameContext";
import type { GameContext } from "../contexts/GameContext";

export const useGameContext = (): GameContext => {
	const context = useContext(gameContext);
	if (context === undefined) {
		throw new Error("useGameContext must be used within a GameProvider");
	}
	return context;
};
