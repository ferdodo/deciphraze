import type { ParagraphOfTheDayRepository } from "../repositories/ParagraphOfTheDayRepository";
import { paragraphOfTheDay } from "../paragraphOfTheDay";

export function createParagraphOfTheDayRepository(): ParagraphOfTheDayRepository {
	return {
		getParagraphOfTheDay(): string {
			return paragraphOfTheDay;
		}
	};
}

