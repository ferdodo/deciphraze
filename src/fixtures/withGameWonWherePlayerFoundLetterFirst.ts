import type { GameContextType } from "../types/GameContextType";
import { withGameStarted } from "./withGameStarted";
import { asPlayerFinishGameStartingWithLetter } from "../automations/asPlayerFinishGameStartingWithLetter";

export function withGameWonWherePlayerFoundLetterFirst(firstLetter: string): [() => void, GameContextType] {
	const [cleanup, context] = withGameStarted();
	asPlayerFinishGameStartingWithLetter(context, firstLetter);
	return [cleanup, context];
}
