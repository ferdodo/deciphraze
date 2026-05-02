import { getSevenLetterWords } from "./getSevenLetterWords";
import type { RandomService } from "../services/RandomService";

export function getChallengeWordForLevelAndDay(level: number, realDay: string, randomService: RandomService): string {
	const seed = `${realDay}:${level}`;
	const words = getSevenLetterWords();
	const randomInt = randomService.createIntPRNG(seed);
	const index = randomInt(0, words.length - 1);
	return words[index];
}
