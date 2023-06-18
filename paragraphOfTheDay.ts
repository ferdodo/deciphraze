import { randomNumber } from "./randomNumber";
import { ebook1 } from "./ebook1";

export const paragraphOfTheDay = getParagraphOfTheDay();

function getParagraphOfTheDay (): string {
	const lines = ebook1.split(/\r\n|\r|\n/);
	const lineCount = lines.length - 200;
	const paragraphStartLine = randomNumber(200, lineCount);
	let paragraph = "";
	let cursor = 0;

	while (paragraph.length < 200) {
		paragraph += lines[paragraphStartLine + cursor];
		cursor++;
	}

	return paragraph;
}
