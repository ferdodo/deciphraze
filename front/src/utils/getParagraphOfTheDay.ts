import { createIntPRNG } from "./createIntPRNG";
import { ebook1 } from "../constants/ebook1";

export function getParagraphOfTheDay(date: string): string {
	const lines = ebook1.split(/\r\n|\r|\n/);
	const lineCount = lines.length - 200;
	const randomInt = createIntPRNG(date);
	const paragraphStartLine = randomInt(200, lineCount);
	let paragraph = "";
	let cursor = 0;

	while (paragraph.length < 200) {
		paragraph += lines[paragraphStartLine + cursor];
		cursor++;
	}

	return paragraph;
}

