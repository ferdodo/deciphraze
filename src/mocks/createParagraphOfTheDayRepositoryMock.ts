import type { ParagraphOfTheDayRepository } from "../types/ParagraphOfTheDayRepository";

export function createParagraphOfTheDayRepositoryMock(): ParagraphOfTheDayRepository {
	return {
		getParagraphOfTheDay(): string {
			return "Hello World! This is a test paragraph.";
		}
	};
}
