import { getSevenLetterWords } from "./getSevenLetterWords";
import { createIntPRNG } from "./createIntPRNG";

export function getChallengeWordForLevelAndDay(level: number, realDay: string): string {
	const seed = `${realDay}:${level}`;
	const words = getSevenLetterWords();
	const randomInt = createIntPRNG(seed);
	const index = randomInt(0, words.length - 1);
	return words[index];
}
