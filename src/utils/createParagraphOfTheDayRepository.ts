import type { ParagraphOfTheDayRepository } from "../types/ParagraphOfTheDayRepository";
import { paragraphOfTheDay } from "../paragraphOfTheDay";

export function createParagraphOfTheDayRepository(): ParagraphOfTheDayRepository {
	return {
		getParagraphOfTheDay(): string {
			return paragraphOfTheDay;
		}
	};
}
