import { ebook1 } from "@deciphraze/core";
import { generateRandomNumberFromDay } from "./generateRandomNumberFromDay";

export function generateParagraph(date: string): string {
	const lines = ebook1.split(/\r\n|\r|\n/);
	const lineCount = lines.length - 200;
	const paragraphStartLine = generateRandomNumberFromDay(200, lineCount, date);
	let paragraphText = "";
	let cursor = 0;

	while (paragraphText.length < 200) {
		paragraphText += lines[paragraphStartLine + cursor];
		cursor++;
	}

	return paragraphText;
}

