import type { LetterSelection } from "./LetterSelection";
import type { SymbolSelection } from "./SymbolSelection";
import type { PlayerCipher } from "./PlayerCipher";

export interface AllGames {
	gameByDay: Record<string, {
		letterSelection: LetterSelection;
		symbolSelection: SymbolSelection;
		playerCipher: PlayerCipher;
	}>;
}
