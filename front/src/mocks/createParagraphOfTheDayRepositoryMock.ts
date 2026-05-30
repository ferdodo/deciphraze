import type { ParagraphOfTheDayRepository } from "../repositories/ParagraphOfTheDayRepository";

export function createParagraphOfTheDayRepositoryMock(): ParagraphOfTheDayRepository {
	return {
		getParagraphOfTheDay(): string {
			return "Hello World! This is a test paragraph.";
		}
	};
}
