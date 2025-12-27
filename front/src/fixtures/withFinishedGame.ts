import type { GameContextType } from "../types/GameContextType";
import { withGameStarted } from "./withGameStarted";
import { asPlayerFinishGame } from "../automations/asPlayerFinishGame";

export function withFinishedGame(): [() => void, GameContextType] {
	const [cleanup, context] = withGameStarted();
	asPlayerFinishGame(context);
	return [cleanup, context];
}
