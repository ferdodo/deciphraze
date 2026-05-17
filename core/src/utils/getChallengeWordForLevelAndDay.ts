import { getSevenLetterWords } from "./getSevenLetterWords";
import { getISOWeek } from "./getISOWeek";
import type { RandomService } from "../services/RandomService";

export function getChallengeWordForLevelAndDay(level: number, realDay: string, randomService: RandomService): string {
	// Use ISO week number instead of day to ensure the same word for the entire week
	const { week, year } = getISOWeek(realDay);
	const seed = `${year}:W${week}:${level}`;
	const words = getSevenLetterWords();
	const randomInt = randomService.createIntPRNG(seed);
	const index = randomInt(0, words.length - 1);
	console.log("getChallengeWordForLevelAndDay", words[index])
	return words[index];
}
